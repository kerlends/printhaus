/* @flow */

import firebase from 'firebase';
import 'firebase/firestore';

import BaseConnector from './BaseConnector';
import type { Product } from '../types/product';

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

      if (!snap.forEach) return y({ id: snap.id, ...snap.data() });

      const data = [];
      snap.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      return y(data);
    });

  write = (collection: string, doc?: string, data: Object): Promise<any> =>
    new Promise(async (y, n) => {
      let snap = db.collection(collection);
      if (doc) snap = snap.doc(doc);
      try {
        snap = await snap.add(data);
        return y(await this.read(collection, snap.id));
      } catch (e) {
        return n(e);
      }
    });

  getProducts = () => this.read('products');

  addProduct = ({ soldOut: sold_out = false, ...data }: Product) =>
    this.write('products', undefined, { sold_out, ...data });
}
