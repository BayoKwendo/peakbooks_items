import { Application, Context, Router } from "https://deno.land/x/oak/mod.ts";
import { green, yellow } from "https://deno.land/std@0.53.0/fmt/colors.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { cron, start, stop, everyMinute, daily, weekly } from 'https://deno.land/x/deno_cron/cron.ts';
import userService from "./services/userService.ts";


const app = new Application();
const port: number = 50;

let task = cron('*/.5 * * * * *', async () => {
  stop();
  const days = await userService.checkUsersTrials();

  if (days != undefined) {
    console.log(days.email)

    if (days.days == 47 && days.reminder == 0) {
      const postRequest = await fetch('https://www.peakbooks.biz:9000/insightphp/sendTrialPlanReminder.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_name: days.company_name,
          email: days.email,
          days: days.days
        })
      })
      if (postRequest) {
        const upDateUser = await userService.updateReminder({
          client_id: days.id,
          reminder: 1
        });
        if (upDateUser) {
          // start();
          const postRequest = await fetch('https://www.peakbooks.biz:9000/insightphp/sendFeedBackEmailAfterTrial.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              company_name: days.company_name,
              email: days.email,
              days: days.days
            })
          })
          if(postRequest){

            console.log("hellodcccdd")
            start();
          }
        } else {
          start();
          console.log("helloddrrrd")
        }
      } else {
         start();
        console.log("helloddd")
      }
    } else if (days.days == 7 && days.reminder == 1) {

      const postRequest = await fetch('https://www.peakbooks.biz:9000/insightphp/sendTrialPlanReminder.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            company_name: days.company_name,
            email: days.email,
            days: days.days
          })
        })
        if (postRequest) {
          const upDateUser = await userService.updateReminder({
            client_id: days.id,
            reminder: 2
          });
          if (upDateUser) {
            start();
            console.log("hellodcccdd")
          } else {
            start();
            console.log("helloddrrrd")
          }
        } else {
           start();
          console.log("helloddd")
        }
      }

    else if (days.days == 1 && days.reminder == 2) {

      const postRequest = await fetch('https://www.peakbooks.biz:9000/insightphp/sendTrialPlanReminder.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_name: days.company_name,
          email: days.email,
          days: days.days
        })
      })
      if (postRequest) {
        const upDateUser = await userService.updateReminder({
          client_id: days.id,
          reminder: 5
        });
        if (upDateUser) {
          start();
          console.log("hellodcccdd")
        } else {
          start();
          console.log("helloddrrrd")
        }
      } else {
         start();
        console.log("helloddd")
      }
    }
     
  } else {
      
    let days = await userService.checkUsersPlans();

    if (days != undefined) {

      console.log(days.email)

      if (days.days == 15 && days.reminder == 4) {
        const postRequest = await fetch('https://www.peakbooks.biz:9000/insightphp/sendTrialReminder.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            company_name: days.company_name,
            email: days.email,
            days: days.days
          })
        })
        if (postRequest) {
          const upDateUser = await userService.updateReminder({
            client_id: days.id,
            reminder: 5
          });
          if (upDateUser) {
            start();
            console.log("hellodcccdd")
          } else {
            start();
            console.log("helloddrrrd")
          }
        } else {
          start();
          console.log("helloddd")
        }
      } else if (days.days == 7 && days.reminder == 5) {

        const postRequest = await fetch('https://www.peakbooks.biz:9000/insightphp/sendTrialReminder.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            company_name: days.company_name,
            email: days.email,
            days: days.days
          })
        })
        if (postRequest) {
          const upDateUser = await userService.updateReminder({
            client_id: days.id,
            reminder: 6
          });
          if (upDateUser) {
            start();
            console.log("hellodcccdd")
          } else {
            start();
            console.log("helloddrrrd")
          }
        } else {
          start();
          console.log("helloddd")
        }
      }

      else if (days.days == 1 && days.reminder == 6) {
        const postRequest = await fetch('https://www.peakbooks.biz:9000/insightphp/sendTrialReminder.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            company_name: days.company_name,
            email: days.email,
            days: days.days
          })
        })
        if (postRequest) {
          const upDateUser = await userService.updateReminder({
            client_id: days.id,
            reminder: 7
          });
          if (upDateUser) {
            start();
            console.log("hellodcccdd")
          } else {
            start();
            console.log("helloddrrrd")
          }
        } else {
          start();
          console.log("helloddd")
        }
      }

    } else {


      //acount reminder

      let days = await userService.checkUsersAccountPlansExpiry();

      if (days != undefined) {
        console.log(days.email)

        if (days.days == 7 && days.reminder == 7) {
          const postRequest = await fetch('https://www.peakbooks.biz:9000/insightphp/accountPaidReminder.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              company_name: days.company_name,
              email: days.email,
              days: days.days
            })
          })
          if (postRequest) {
            const upDateUser = await userService.updateReminder({
              client_id: days.id,
              reminder: 8
            });
            if (upDateUser) {
              start();
              console.log("hellodcccdd")
            } else {
              start();
              console.log("helloddrrrd")
            }
          } else {
            start();
            console.log("helloddd")
          }
        } else if (days.days == 15 && days.reminder == 8) {

          const postRequest = await fetch('https://www.peakbooks.biz:9000/insightphp/accountPaidReminder.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              company_name: days.company_name,
              email: days.email,
              days: days.days
            })
          })
          if (postRequest) {
            const upDateUser = await userService.updateReminder({
              client_id: days.id,
              reminder: 9
            });
            if (upDateUser) {
              start();
              console.log("hellodcccdd")
            } else {
              start();
              console.log("helloddrrrd")
            }
          } else {
            start();
            console.log("helloddd")
          }
        }

        else if (days.days == 21 && days.reminder == 9) {
          const postRequest = await fetch('https://www.peakbooks.biz:9000/insightphp/accountPaidReminder.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              company_name: days.company_name,
              email: days.email,
              days: days.days
            })
          })
          if (postRequest) {
            const upDateUser = await userService.updateReminder({
              client_id: days.id,
              reminder: 10
            });
            if (upDateUser) {
              start();
              console.log("hellodcccdd")
            } else {
              start();
              console.log("helloddrrrd")
            }
          } else {
            start();
            console.log("helloddd")
          }
        }

        else if (days.days == 30 && days.reminder == 10) {
          const postRequest = await fetch('https://www.peakbooks.biz:9000/insightphp/accountPaidReminder.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              company_name: days.company_name,
              email: days.email,
              days: days.days
            })
          })
          if (postRequest) {
            const upDateUser = await userService.updateReminder({
              client_id: days.id,
              reminder: 11
            });
            if (upDateUser) {
              start();
              console.log("hellodcccdd")
            } else {
              start();
              console.log("helloddrrrd")
            }
          } else {
            start();
            console.log("helloddd")
          }
        }
      } else {


        //acount trial reminder

        let days = await userService.checkUsersTrialAfterExpiry();

        if (days != undefined) {
          console.log(days.email)

          if (days.days == 7 && days.reminder == 11) {
            const postRequest = await fetch('https://www.peakbooks.biz:9000/insightphp/expiryReminderAfterTrial.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                company_name: days.company_name,
                email: days.email,
                days: days.days
              })
            })
            if (postRequest) {
              const upDateUser = await userService.updateReminder({
                client_id: days.id,
                reminder: 12
              });
              if (upDateUser) {
                start();
                console.log("hellodcccdd")
              } else {
                start();
                console.log("helloddrrrd")
              }
            } else {
              start();
              console.log("helloddd")
            }
          } else if (days.days == 15 && days.reminder == 12) {

            const postRequest = await fetch('https://www.peakbooks.biz:9000/insightphp/expiryReminderAfterTrial.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                company_name: days.company_name,
                email: days.email,
                days: days.days
              })
            })
            if (postRequest) {
              const upDateUser = await userService.updateReminder({
                client_id: days.id,
                reminder: 13
              });
              if (upDateUser) {
                start();
                console.log("hellodcccdd")
              } else {
                start();
                console.log("helloddrrrd")
              }
            } else {
              start();
              console.log("helloddd")
            }
          }

          else if (days.days == 21 && days.reminder == 13) {
            const postRequest = await fetch('https://www.peakbooks.biz:9000/insightphp/expiryReminderAfterTrial.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                company_name: days.company_name,
                email: days.email,
                days: days.days
              })
            })
            if (postRequest) {
              const upDateUser = await userService.updateReminder({
                client_id: days.id,
                reminder: 14
              });
              if (upDateUser) {
                start();
                console.log("hellodcccdd")
              } else {
                start();
                console.log("helloddrrrd")
              }
            } else {
              start();
              console.log("helloddd")
            }
          }

          else if (days.days == 30 && days.reminder == 14) {
            const postRequest = await fetch('https://www.peakbooks.biz:9000/insightphp/expiryReminderAfterTrial.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                company_name: days.company_name,
                email: days.email,
                days: days.days
              })
            })
            if (postRequest) {
              const upDateUser = await userService.updateReminder({
                client_id: days.id,
                reminder: 15
              });
              if (upDateUser) {
                start();
                console.log("hellodcccdd")
              } else {
                start();
                console.log("helloddrrrd")
              }
            } else {
              start();
              console.log("helloddd")
            }
          }
        } else{

          //continues ,,,,,
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