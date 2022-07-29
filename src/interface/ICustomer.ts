export interface ICreateCustomer {
  name: string;
  email: string;
}
export interface ICustomer {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export interface ICustomerPaginate {
  per_page: number;
  total: number;
  current_page: number;
  data: ICustomer[];
}

export type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface ICustomersRepository {
  findAll({ page, skip, take }: SearchParams);
  findByName(name: string);
  findById(id: string);
  findByEmail(email: string);
  create(data: ICreateCustomer);
  save(customer: ICustomer);
  remove(customer: ICustomer);
}

/*
Chama de "contrato" que irá seguir isso, sendo enviado para o repositório
*/
