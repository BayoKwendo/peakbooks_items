import client from "../db/client.ts";
import { TABLE } from "../db/config.ts";
import User from "../interfaces/User.ts";

export default {


  //CHECK TRIAL EXPIRY 
  checkUsersTrials: async () => {
    const result = await client.query(
      `SELECT DATEDIFF (DATE_FORMAT(subscription, '%Y-%m-%d'), DATE_FORMAT(NOW(), '%Y-%m-%d')) days, company_name, email, reminder, client_id id
       FROM  ${TABLE.USERS} WHERE role_id = 2 AND first_time = 1 AND paid = 0 AND checked = 0 ORDER BY id ASC LIMIT 1`);
    return result;
  },


  //Remind users of not expiry account that have not reniewed
  checkUsersTrialAfterExpiry: async () => {
    const result = await client.query(
      `SELECT DATEDIFF (DATE_FORMAT(NOW(), '%Y-%m-%d'), DATE_FORMAT(subscription, '%Y-%m-%d') ) days, company_name, email, reminder, client_id id
       FROM  ${TABLE.USERS} WHERE role_id = 2 AND first_time = 1 AND checked = 0 ORDER BY id ASC LIMIT 1`);
    return result;
  },



  //CHECK PAYMENT PLAN EXPIRY
  checkUsersPlans: async () => {
    const result = await client.query(
      `SELECT DATEDIFF (DATE_FORMAT(subscription, '%Y-%m-%d'), DATE_FORMAT(NOW(), '%Y-%m-%d')) days, company_name, email, reminder, client_id id
       FROM  ${TABLE.USERS} WHERE role_id = 2 AND first_time = 0 AND checked = 0 AND paid = 1  ORDER BY id ASC LIMIT 1`);
    return result;
  },


  //Remind users of not paid plan that have ntot reniewed
  checkUsersAccountPlansExpiry: async () => {
    const [result] = await client.query(
      `SELECT DATEDIFF (DATE_FORMAT(NOW(), '%Y-%m-%d'), DATE_FORMAT(subscription, '%Y-%m-%d') ) days, company_name, email, reminder, client_id id
       FROM  ${TABLE.USERS} WHERE role_id = 2 AND first_time = 0 AND paid = 1 AND checked = 0  ORDER BY id ASC LIMIT 1`);
    return result;
  },


  //CHECK PAYMENT PLAN AFTER EXPIRY
  checkUsersPlansExpiry: async () => {
    const result = await client.query(
      `SELECT DATEDIFF (DATE_FORMAT(subscription, '%Y-%m-%d'), DATE_FORMAT(NOW(), '%Y-%m-%d')) days, company_name, email, reminder, client_id id
         FROM  ${TABLE.USERS} WHERE role_id = 2  AND  first_time = 0 AND checked = 0 AND DATEDIFF(DATE_FORMAT(subscription, '%Y-%m-%d'), DATE_FORMAT(NOW(), '%Y-%m-%d')) BETWEEN -30 AND 0  ORDER BY id ASC LIMIT 1`);
    return result;
  },




  // update reminders
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

  updateReminderChecked: async ({ client_id, reminder, checked }: User) => {
    const result = await client.query(
      `UPDATE ${TABLE.USERS} SET  
      checked = ?
      WHERE client_id = ?`,
      [reminder, checked, client_id],
    );
    return result;
  },

  

};
