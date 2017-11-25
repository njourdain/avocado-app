import * as ClientOAuth2 from 'client-oauth2';
import * as Csrf from 'csrf';
import { Express } from 'express';
import * as express from 'express';
import { Request, Response } from 'express-serve-static-core';
import { QuickbooksOptions } from './quickbooks.options';
import * as request from 'request';
import { RequestResponse } from 'request';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import session = require('express-session');

export class Quickbooks {
  public app: Express;
  private client: ClientOAuth2;
  private options: QuickbooksOptions;
  private accessTokenUri: string;
  private authorizationUri: string;
  private csrf = new Csrf();

  constructor(options: QuickbooksOptions) {
    this.options = options;

    Observable.timer(0, 86400000)
      .subscribe(() => this.getRemoteUris()
      .then(uris => this.updateRemoteUris(uris)));

    this.app = express();
    this.app.use(session({secret: 'secret', resave: false, saveUninitialized: false}));
    this.app.get('/login', (req: Request, res: Response) => this.login(req, res));
    this.app.get('/callback', (req: Request, res: Response) => this.callback(req, res));
    this.app.get('/test', (req: Request, res: Response) => res.send(req.session!.accessToken));
  }

  private getRemoteUris(): Promise<{uris: any}> {
    return new Promise<{uris: any}>(resolve => {
      request.get(
        this.options.configurationUri,
        { headers: { 'Accept': 'application/json' } },
        (error: any, response: RequestResponse) => {
          if (error) {
            console.log(error);
            resolve();
          }

          resolve(JSON.parse(response.body));
        }
      );
    });
  }

  private updateRemoteUris(uris: any) {
    this.accessTokenUri = uris.token_endpoint;
    this.authorizationUri = uris.authorization_endpoint;

    this.initOAuthClient();
  }

  private initOAuthClient() {
    const clientOptions = {
      clientId: this.options.clientId,
      clientSecret: this.options.clientSecret,
      accessTokenUri: this.accessTokenUri,
      authorizationUri: this.authorizationUri,
      scopes: ['com.intuit.quickbooks.accounting'],
      redirectUri: this.options.callbackUri
    } as ClientOAuth2.Options;

    this.client = new ClientOAuth2(clientOptions);
  }

  private login(req: Request, res: Response) {
    if (!req.session) {
      console.error('request has no session');
      res.send(500);
      return;
    }

    req.session.secret = this.csrf.secretSync();

    const uri = this.client.code.getUri({
      state: this.csrf.create(req.session.secret)
    });

    res.redirect(uri)
  }

  private callback(req: Request, res: Response) {
    console.log('/callback');
    if (!req.session) {
      console.error('request has no session');
      res.send(500);
      return;
    }

    if (!this.csrf.verify(req.session.secret, req.query.state)) {
      console.log('request has invalid anti-forgery token');
      res.send(400);
      return;
    }

    const uri = [this.options.functionPrefix, req.originalUrl].filter(s => !!s).join('');
    this.client.code.getToken(uri)
      .then(token => {
        req.session!.accessToken = token.accessToken;
        req.session!.refreshToken = token.refreshToken;
        req.session!.tokenType = token.tokenType;
        req.session!.data = token.data;
        req.session!.realmId = req.query.realmId;
        res.send(200);
      })
  }
}
