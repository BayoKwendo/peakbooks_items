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

  console.log(days.days)

  if (days) {

    if (days.days > 7 && days.reminder == 0) {

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
          reminder: 1,
          checked: 0
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
          if (postRequest) {

            console.log("hellodcccdd")
            start();
          }
        } else {
          start();
          // console.log("helloddrrrd")
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
          reminder: 2,
          checked: 0
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
          reminder: 4,
          checked: 0
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
      }
    }
    else {

      if (days.days == 16 || days.days == 8 || days.days == 2) {
        const upDateUser = await userService.updateReminder({
          client_id: days.id,
          reminder: 0,
          checked: 0
        });
        if (upDateUser) {
          start();
          console.log("hellodcccdd")
        } else {
          start();
          console.log("helloddrrrd")
        }
      } else {
        
        const upDateUser = await userService.updateReminder({
          client_id: days.id,
          reminder: 4,
          checked: 0
        });
        if (upDateUser) {
          start();
          console.log("hellodcccdd")
        } else {
          start();
          console.log("helloddrrrd")
        }
      }
    }
  }

  else {


    const days = await userService.checkUsersPlans();

    if (days) {
      // console.log(days.email)
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
            reminder: 5,
            checked: 0
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
            reminder: 6,
            checked: 0
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
            reminder: 7,
            checked: 0
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
        }
      } else {

        if (days.days == 16 || days.days == 8 || days.days == 2) {
          const upDateUser = await userService.updateReminder({
            client_id: days.id,
            reminder: 4,
            checked: 0
          });
          if (upDateUser) {
            start();
            console.log("hellodcccdd")
          } else {
            start();
            console.log("helloddrrrd")
          }
        } else {

          const upDateUser = await userService.updateReminder({
            client_id: days.id,
            reminder: 7,
            checked: 0
          });
          if (upDateUser) {
            start();
            console.log("hellodcccdd")
          } else {
            start();
            console.log("helloddrrrd")
          }
        }
        // start();
      }

    } else {

      const days = await userService.checkUsersAccountPlansExpiry();

      if (days) {

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
              reminder: 8,
              checked: 0
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
              reminder: 9,
              checked: 0
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
              reminder: 10,
              checked: 0
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
              reminder: 11,
              checked: 0
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
        } else {

          if (days.days == 6 || days.days == 14 || days.days == 20 || days.days == 29) {
            const upDateUser = await userService.updateReminder({
              client_id: days.id,
              reminder: 7,
              checked: 0,
            });
            if (upDateUser) {
              start();
              console.log("hellodcccdd")
            } else {
              start();
              console.log("helloddrrrd")
            }
          } else {

            const upDateUser = await userService.updateReminder({
              client_id: days.id,
              reminder: 11,
              checked: 0,
            });
            if (upDateUser) {
              start();
              console.log("hellodcccdd")
            } else {
              start();
              console.log("helloddrrrd")
            }
          }
        }
      } else {


        const days = await userService.checkUsersTrialAfterExpiry();

        if (days) {
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
                reminder: 12,
                checked: 0
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
                reminder: 13,
                checked: 0
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
                reminder: 14,
                checked: 0
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
                reminder: 15,
                checked: 1
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
          } else {
            start();
          }
        } else {

          if (days.days == 6 || days.days == 14 || days.days == 20 || days.days == 29) {
            const upDateUser = await userService.updateReminder({
              client_id: days.id,
              reminder: 11,
              checked: 0
            });
            if (upDateUser) {
              start();
              console.log("hellodcccdd")
            } else {
              start();
              console.log("helloddrrrd")
            }
          } else {

            const upDateUser = await userService.updateReminder({
              client_id: days.id,
              reminder: 0,
              checked: 0
            });
            if (upDateUser) {
              start();
              console.log("hellodcccdd")
            } else {
              start();
              console.log("helloddrrrd")
            }
          }          // start();
          //continues ,,,,,
        }

      }

    }
    console.log("gg")
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