import { Container } from 'typedi'; 
import Query from '../model/query.js';

export default ({ connection }) => {
    Container.set('query', new Query(connection));
}