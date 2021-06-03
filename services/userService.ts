import client from "../db/client.ts";
import { TABLE } from "../db/config.ts";
import User from "../interfaces/User.ts";

export default {


  //CHECK TRIAL EXPIRY 
  checkUsersTrials: async () => {
    const [result] = await client.query(
      `SELECT DATEDIFF (DATE_FORMAT(subscription, '%Y-%m-%d'), DATE_FORMAT(NOW(), '%Y-%m-%d')) days, company_name, email, reminder, client_id id
       FROM  ${TABLE.USERS} WHERE role_id = 2 AND first_time = 1 AND checked = 0 AND reminder in (0,1,2)  GROUP BY client_id ORDER BY id ASC LIMIT 1`);
    return result;
  },


  //Remind users of not expiry account that have not reniewed
  checkUsersTrialAfterExpiry: async () => {
    const [result] = await client.query(
      `SELECT DATEDIFF (DATE_FORMAT(NOW(), '%Y-%m-%d'), DATE_FORMAT(subscription, '%Y-%m-%d') ) days, company_name, email, reminder, client_id id
       FROM  ${TABLE.USERS} WHERE role_id = 2 AND first_time = 1 AND checked = 0 AND reminder in (11,12,13,14)  GROUP BY client_id ORDER BY id ASC LIMIT 1`);
    return result;
  },



//CHECK PAYMENT PLAN EXPIRY
  checkUsersPlans: async () => {
    const [result] = await client.query(
      `SELECT DATEDIFF (DATE_FORMAT(subscription, '%Y-%m-%d'), DATE_FORMAT(NOW(), '%Y-%m-%d')) days, company_name, email, reminder, client_id id
       FROM  ${TABLE.USERS} WHERE role_id = 2 AND first_time = 0 AND checked = 0 AND paid = 1 AND reminder in (4,5,6)  GROUP BY client_id ORDER BY id ASC LIMIT 1`);
    return result;
  },


//Remind users of not paid plan that have ntot reniewed
  checkUsersAccountPlansExpiry: async () => {
    const [result] = await client.query(
      `SELECT DATEDIFF (DATE_FORMAT(NOW(), '%Y-%m-%d'), DATE_FORMAT(subscription, '%Y-%m-%d') ) days, company_name, email, reminder, client_id id
       FROM  ${TABLE.USERS} WHERE role_id = 2 AND first_time = 0 AND paid = 1 AND checked = 0 AND reminder in (7,8,9,10)  GROUP BY client_id ORDER BY id ASC LIMIT 1`);
    return result;
  },




  updateReminder: async ({ client_id, reminder, checked }: User) => {
    const result = await client.query(
      `UPDATE ${TABLE.USERS} SET  
      reminder = ?,
      checked = ?
      WHERE client_id = ?`,
      [reminder, checked, client_id],
    );
    return result;
  },



};
