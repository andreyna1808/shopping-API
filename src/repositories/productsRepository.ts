/* eslint-disable import/no-extraneous-dependencies */
import { EntityRepository, Repository } from 'typeorm';

import ProductsEntitie from '../entities/productsEntitie';

@EntityRepository(ProductsEntitie)
export default class ProductsRepository extends Repository<ProductsEntitie> {}

/*
Repositories faz a comunicação entre a entidade e a tabela do banco de dados
representação e manipulação de dados
Para cada entidade criamos um repositório que será um classe que irá
representar a entidade dentro do banco de dados, faz a manipulação que for
necessário fazer
*/
