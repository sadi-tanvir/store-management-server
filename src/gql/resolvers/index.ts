import brandResolver from "./brand.resolvers";
import usersResolver from "./user.resolvers";
import categoryResolver from "./category.resolvers";
import productResolver from "./product.resolvers";
import supplierResolver from "./supplier.resolvers";
import stockResolver from "./stock.resolvers";
import orderResolver from "./order.resolvers";



export default [
    usersResolver,
    brandResolver,
    categoryResolver,
    productResolver,
    supplierResolver,
    stockResolver,
    orderResolver
]