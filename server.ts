import { Application, Context, Router } from "https://deno.land/x/oak/mod.ts";
import { green, yellow } from "https://deno.land/std@0.53.0/fmt/colors.ts";
import { cron, start, stop, everySecond, everyMinute, daily, weekly } from 'https://deno.land/x/deno_cron/cron.ts';
import itemService from "./services/itemService.ts";


const app = new Application();
const port: number = 2004;


everySecond(async () => {
  stop();
  // invoice items
  const invoice_items = await itemService.checkItemInvoice();

  if (invoice_items.length > 0) {
    console.log(green("Invoce Items"));
    const items = await itemService.checkItem({
      client_id: invoice_items[0].client_id,
      item_name: invoice_items[0].item_name
    });
    if (items.length > 0) {
      console.log(green("Item Found"));
      await itemService.updateItemInvoice({
        id: invoice_items[0].id,
        item_id: items[0].id
      });
    }
    start();

  } else {
    const credit_items = await itemService.checkCreditItems();
    if (credit_items.length > 0) {
      console.log(green("Credit Items"));
      const items = await itemService.checkItem({
        client_id: credit_items[0].client_id,
        item_name: credit_items[0].item_name
      });
      if (items.length > 0) {
        console.log(green("Item Found"));
        await itemService.updateCreditInvoice({
          id: credit_items[0].id,
          item_id: items[0].id
        });
      }
      start()

    } else {
      const bills_items = await itemService.checkBillsItems();
      if (bills_items.length > 0) {
        console.log(green("Bills Items"));

        const items = await itemService.checkItem({
          client_id: bills_items[0].client_id,
          item_name: bills_items[0].item_name
        });
        if (items.length > 0) {
          console.log(green("Item Found"));
          await itemService.updateBillsItem({
            id: bills_items[0].id,
            item_id: items[0].id
          });
        }

        start();

      } else {
        const vendor_items = await itemService.checkCreditVendorItems();
        if (vendor_items.length > 0) {
          console.log(green("Credit Vendor Items"));
          const items = await itemService.checkItem({
            client_id: vendor_items[0].client_id,
            item_name: vendor_items[0].item_name
          });
          if (items.length > 0) {
            console.log(green("Item Found"));
            await itemService.updateCreditBills({
              id: vendor_items[0].id,
              item_id: items[0].id
            });
          }
          start();
        } else {
          start();
        }
      }

    }

  }

});

app.addEventListener("error", (evt) => {
  console.log(evt.error);
});
app.use((ctx) => {
  ctx.throw(500);
});

app.addEventListener("listen", ({ secure, hostname, port }) => {
  const protocol = secure ? "https://" : "http://";
  const url = `${protocol}${hostname ?? "localhost"}:${port}`;
  console.log(`${yellow("Listening on:")} ${green(url)}`,);
});

await app.listen({ port });