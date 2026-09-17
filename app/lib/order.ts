export interface OrderItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Order {

  invoiceId:string;

  customer:{
    name:string;
    email:string;
    address:string;
    city:string;
    phone:string;
    postalCode:string;
  };


  items:OrderItem[];

  subtotal:number;

  deliveryFee:number;

  total:number;

}