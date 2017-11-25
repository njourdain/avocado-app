import * as functions from "firebase-functions";
import { Quickbooks } from "./quickbooks/quickbooks";

exports.quickbooks = functions.https.onRequest(new Quickbooks().app);
