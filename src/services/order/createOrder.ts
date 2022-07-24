import { getCustomRepository, Repository } from 'typeorm';

import CustomersEntitie from '../../entities/customersEntitie';
import OrdersEntitie from '../../entities/orderEntitie';
import ProductsEntitie from '../../entities/productsEntitie';
import CustomRepository from '../../repositories/customersRepository';
import OrdersRepository from '../../repositories/ordersRepository';
import ProductsRepository from '../../repositories/productsRepository';
import { AppError } from '../../utils/appError';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  id: string;
  products: IProduct[];
}

class CreateOrderService {
  private orderRepository: Repository<OrdersEntitie>;
  private customRepository: Repository<CustomersEntitie>;
  private productRepository: Repository<ProductsEntitie>;

  constructor() {
    this.orderRepository = getCustomRepository(OrdersRepository);
    this.customRepository = getCustomRepository(CustomRepository);
    this.productRepository = getCustomRepository(ProductsRepository);
  }

  async create({ id, products }: IRequest) {
    // Verifica se existe um cliente
    const customerExists = await this.customRepository.findOne({ id });

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id.');
    }

    // Verifica se existe algum produto
    const existsProducts = await this.productRepository.find();

    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids.');
    }

    // Pega os id que foram encontrados
    const existsProductsIds = existsProducts.map(product => product.id);

    // Verifica os produtos inexistentes
    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}.`,
      );
    }

    // Pecorre cada produto e verifica se a quantidade que foi enviado é igual ao id que já existe,
    const quantityAvailable = products.filter(
      product =>
        existsProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    // Se a quantidade comprada for maior que existe, então não pode vender o produto
    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity}
         is not available for ${quantityAvailable[0].id}.`,
      );
    }

    // Pega o preço da tabela, array com lista de produtos já montada, id, quantidade e preço
    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    // Passa os dados que precisa para criar o registro
    const order = this.orderRepository.create({
      customer: customerExists,
      order_products: serializedProducts,
    });

    const { order_products } = order;

    // Faz um map de cada produto, e remove a quantidade que existe no banco de dados pela quantidade que o customer está comprando
    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await this.productRepository.save(updatedProductQuantity);

    return order;
  }
}

export default CreateOrderService;
