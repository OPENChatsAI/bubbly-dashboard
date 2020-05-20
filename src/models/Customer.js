import User from "./User";
import Address from "./Address";

export default class Customer extends User {
  constructor(data) {
    super(data);
    this.customerId = data.customerId;
    this.addresses =
      data?.addresses?.map((item) => new Address(item.id, item)) ?? null;

    this.vehicles = data?.vehicles ?? [];
    this.sources = data?.sources ?? [];
  }
}
