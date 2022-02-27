import { Client, ClientConfig } from "https://deno.land/x/mysql/mod.ts";
// config
import { DATABASE, MYSQL, TABLE } from "./config.ts";
import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";


const config: ClientConfig = {
  hostname: MYSQL.host,
  username: MYSQL.user,
  password: MYSQL.password,
  db: MYSQL.database,
  port: MYSQL.port,
  debug: true
}
const client = await new Client().connect(config);
export default client;