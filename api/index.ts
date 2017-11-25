import * as functions from "firebase-functions";
import { Quickbooks } from "./quickbooks/quickbooks";
import { QuickbooksOptions } from './quickbooks/quickbooks.options';

const quickbooksOptions = new QuickbooksOptions();
quickbooksOptions.clientId = functions.config().quickbooks['client-id'];
quickbooksOptions.clientSecret = functions.config().quickbooks['client-secret'];
quickbooksOptions.callbackUri = functions.config().quickbooks['callback-uri'];
quickbooksOptions.configurationUri = functions.config().quickbooks['configuration-uri'];
quickbooksOptions.functionPrefix = functions.config().quickbooks['function-prefix'];

const quickbooks = new Quickbooks(quickbooksOptions);
exports.quickbooks = functions.https.onRequest(quickbooks.app);
