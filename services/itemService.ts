import client from "../db/client.ts";
import { TABLE } from "../db/config.ts";
import Item from "../interfaces/Item.ts";

export default {

  //CHECK ITEMS INVOICES WITH STATUS 0 
  checkItemInvoice: async () => {
    const result = await client.query(
      `SELETE * ${TABLE.INVOICE_ITEMS} WHERE status = 0 LIMIT 1`);
    return result;
  },
  updateItemInvoice: async ({ id, item_id }: Item) => {
    const result = await client.query(
      `UPDATE ${TABLE.INVOICE_ITEMS} SET item_id = ? AND status = 0 WHERE id = ?`, [item_id, id]);
    return result;
  },

  //CHECK ITEMS INVOICES WITH STATUS 0 
  checkCreditItems: async () => {
    const result = await client.query(
      `SELETE * ${TABLE.CREDIT_ITEMS} WHERE status = 0 LIMIT 1`);
    return result;
  },


  updateCreditInvoice: async ({ id, item_id }: Item) => {
    const result = await client.query(
      `UPDATE ${TABLE.CREDIT_ITEMS} SET item_id = ? AND status = 0 WHERE id = ?`, [item_id, id]);
    return result;
  },

  //CHECK ITEMS bills WITH STATUS 0 
  checkBillsItems: async () => {
    const result = await client.query(
      `SELETE * ${TABLE.BILL_ITEMS} WHERE status = 0 LIMIT 1`);
    return result;
  },


  updateBillsItem: async ({ id, item_id }: Item) => {
    const result = await client.query(
      `UPDATE ${TABLE.BILL_ITEMS} SET item_id = ? AND status = 0 WHERE id = ?`, [item_id, id]);
    return result;
  },
  //CHECK ITEMS INVOICES WITH STATUS 0 
  checkCreditVendorItems: async () => {
    const result = await client.query(
      `SELETE * ${TABLE.CREDIT_NOTE_ITEMS} WHERE status = 0 LIMIT 1`);
    return result;
  },


  updateCreditBills: async ({ id, item_id }: Item) => {
    const result = await client.query(
      `UPDATE ${TABLE.CREDIT_NOTE_ITEMS} SET item_id = ? AND status = 0 WHERE id = ?`, [item_id, id]);
    return result;
  },


  checkItem: async ({ client_id, item_name }: Item) => {
    const result = await client.query(
      `SELETE * ${TABLE.ITEMS} WHERE client_id = ?  AND item_name = ? LIMIT 1`, [client_id, item_name]);
    return result;
  },


};
