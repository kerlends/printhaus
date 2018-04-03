/* @flow */

import firebase from 'firebase';
import 'firebase/firestore';

import BaseConnector from './BaseConnector';

var config = {
  apiKey: 'AIzaSyD_6O3GEPE4k0Ebe_o1tnHGbunuJXcXD1o',
  authDomain: 'printhaus-4e780.firebaseapp.com',
  databaseURL: 'https://printhaus-4e780.firebaseio.com',
  projectId: 'printhaus-4e780',
  storageBucket: 'printhaus-4e780.appspot.com',
  messagingSenderId: '808363717268',
};

const sdk = firebase.initializeApp(config);
const db = sdk.firestore();

type Props = {
  auth: string,
  baseUrl: string,
};

export default class FirestoreConnector {
  auth: string;

  constructor({ auth }: Props) {
    this.auth = auth;
  }

  read = (collection: string, doc?: string): Promise<any> =>
    new Promise(async (y, n) => {
      let snap = db.collection(collection);
      if (doc) snap = snap.doc(doc);
      snap = await snap.get();
      const data = [];
      snap.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      return y(data);
    });

  getProducts = () => this.read('products');
}
