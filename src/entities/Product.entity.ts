export interface ProductEntity {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
  stock: number;
}

export interface Rating {
  rate: number;
  count: number;
}

export interface ProductByIdDto extends ProductEntity {
  inventory:InventoryAuxDto
}

export interface InventoryAuxDto{
  total: number;
  available: number
}


