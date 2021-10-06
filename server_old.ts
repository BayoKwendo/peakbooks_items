import { Application, Context, Router } from "https://deno.land/x/oak/mod.ts";
import { green, yellow } from "https://deno.land/std@0.53.0/fmt/colors.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { cron, start, stop, everyMinute, daily, weekly } from 'https://deno.land/x/deno_cron/cron.ts';
import userService from "./services/userService.ts";


const app = new Application();
const port: number = 8080;

cron('*/.5 * * * * *', async () => {
  stop();
  console.log(green('Cron job stopped'));
  const day = await userService.checkUsersTrials();

  console.log(day.days)

  if (day.length > 0) {

    let days = day[0];

    if (days.days === 15 && days.reminder === 0) {
      console.log("fffhf")
      await fetch('https://www.peakbooks.biz:9000/insightphp/sendTrialPlanReminder.php', {
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
      await userService.updateReminder({
        client_id: days.id,
        reminder: 1,
        checked: 1
      });
      await fetch('https://www.peakbooks.biz:9000/insightphp/sendFeedBackEmailAfterTrial.php', {
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
      start();
      // console.log("helloddrrrd")
    }
    else if (days.days == 7 && days.reminder == 1) {
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
          checked: 1
        });
        if (upDateUser) {
          start();
          // ////console.log("hellodcccdd")
        } else {
          start();
          // console.log("helloddrrrd")
        }
      } else {
        start();
        // console.log("helloddd")
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
          reminder: 3,
          checked: 1
        });
        if (upDateUser) {
          start();
        } else {
          start();
        }
      } else {
        start();
      }
    }

    else if (days.days == -7 && days.reminder == 3) {
      const postRequest = await fetch('https://www.peakbooks.biz:9000/insightphp/expiryReminderAfterTrial.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_name: days.company_name,
          email: days.email,
          days: Math.abs(days.days)
        })
      })
      if (postRequest) {
        const upDateUser = await userService.updateReminder({
          client_id: days.id,
          reminder: 4,
          checked: 1
        });
        if (upDateUser) {
          start();
        } else {
          start();
        }
      } else {
        start();
        // console.log("helloddd")
      }
    }

    else if (days.days == -15 && days.reminder == 4) {
      const postRequest = await fetch('https://www.peakbooks.biz:9000/insightphp/expiryReminderAfterTrial.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_name: days.company_name,
          email: days.email,
          days: Math.abs(days.days)
        })
      })
      if (postRequest) {
        const upDateUser = await userService.updateReminder({
          client_id: days.id,
          reminder: 5,
          checked: 1
        });
        if (upDateUser) {
          start();
        } else {
          start();
        }
      } else {
        start();
        // console.log("helloddd")
      }
    }

    else if (days.days == -21 && days.reminder == 5) {
      const postRequest = await fetch('https://www.peakbooks.biz:9000/insightphp/expiryReminderAfterTrial.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_name: days.company_name,
          email: days.email,
          days: Math.abs(days.days)
        })
      })
      if (postRequest) {
        const upDateUser = await userService.updateReminder({
          client_id: days.id,
          reminder: 6,
          checked: 1
        });
        if (upDateUser) {
          start();
        } else {
          start();
        }
      } else {
        start();
        // console.log("helloddd")
      }
    }

    else if (days.days == -30 && days.reminder == 6) {
      const postRequest = await fetch('https://www.peakbooks.biz:9000/insightphp/expiryReminderAfterTrial.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_name: days.company_name,
          email: days.email,
          days: Math.abs(days.days)
        })
      })
      if (postRequest) {
        const upDateUser = await userService.updateReminder({
          client_id: days.id,
          reminder: 7,
          checked: 1
        });
        if (upDateUser) {
          start();
        } else {
          start();
        }
      } else {
        start();
        // console.log("helloddd")
      }
    } else {
      // check reminder if incase it was escaped
      if (days.days >= 16) {
        await userService.updateReminder({
          client_id: days.id,
          reminder: 0,
          checked: 0
        });
        start();
      }
      else if (days.days >= 8 && days.days <= 14) {
        await userService.updateReminder({
          client_id: days.id,
          reminder: 1,
          checked: 0
        });
        start();
      }
      else if (days.days >= 2 && days.days <= 6) {
        await userService.updateReminder({
          client_id: days.id,
          reminder: 2,
          checked: 0
        });
        start();
      }

      else if (days.days >= -6 && days.days <= 0) {
        await userService.updateReminder({
          client_id: days.id,
          reminder: 3,
          checked: 0
        });
        start();
      }
      if (days.days >= -14 && days.days <= -8) {
        await userService.updateReminder({
          client_id: days.id,
          reminder: 4,
          checked: 0
        });
        start();
      }
      if (days.days >= -20 && days.days <= -16) {
        await userService.updateReminder({
          client_id: days.id,
          reminder: 5,
          checked: 0
        });
        start();
      }

      if (days.days >= -29 && days.days <= -22) {
        await userService.updateReminder({
          client_id: days.id,
          reminder: 6,
          checked: 0
        });
        start();
      }
      else {
        await userService.updateReminderChecked({
          client_id: days.id,
          // reminder: 8,
          checked: 1
        });
        // console.log("helloddd")
        start();
      }
    }
  }

  else {
    const day = await userService.checkUsersPlans();
    if (day.length > 0) {
      console.log(day.days)
      let days = day[0];
      // console.log(days.email)
      if (days.days == 15 && days.reminder == 8) {
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
            reminder: 9,
            checked: 0
          });
          if (upDateUser) {
            start();
          } else {
            start();
          }
        } else {
          start();
        }
      } else if (days.days == 7 && days.reminder == 9) {
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
            reminder: 10,
            checked: 0
          });
          if (upDateUser) {
            start();
          } else {
            start();
          }
        } else {
          start();
        }
      }
      else if (days.days == 1 && days.reminder == 10) {
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
            reminder: 11,
            checked: 0
          });
          if (upDateUser) {
            start();
          } else {
            start();
          }
        } else {
          start();
        }
      }

      else if (days.days == -7 && days.reminder == 11) {
        const postRequest = await fetch('https://www.peakbooks.biz:9000/insightphp/accountPaidReminder.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            company_name: days.company_name,
            email: days.email,
            days: Math.abs(days.days)
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
          } else {
            start();
          }
        } else {
          start();
          // console.log("helloddd")
        }
      }
      else if (days.days == -15 && days.reminder == 12) {
        const postRequest = await fetch('https://www.peakbooks.biz:9000/insightphp/accountPaidReminder.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            company_name: days.company_name,
            email: days.email,
            days: Math.abs(days.days)
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
          } else {
            start();
          }
        } else {
          start();
          // console.log("helloddd")
        }
      }

      else if (days.days == -21 && days.reminder == 13) {
        const postRequest = await fetch('https://www.peakbooks.biz:9000/insightphp/accountPaidReminder.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            company_name: days.company_name,
            email: days.email,
            days: Math.abs(days.days)
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
          } else {
            start();
          }
        } else {
          start();
          // console.log("helloddd")
        }
      }

      else if (days.days == -30 && days.reminder == 14) {
        const postRequest = await fetch('https://www.peakbooks.biz:9000/insightphp/accountPaidReminder.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            company_name: days.company_name,
            email: days.email,
            days: Math.abs(days.days)
          })
        })
        if (postRequest) {
          const upDateUser = await userService.updateReminder({
            client_id: days.id,
            reminder: 15,
            checked: 0
          });
          if (upDateUser) {
            start();
          } else {
            start();
          }
        } else {
          start();
          // console.log("helloddd")
        }
      }
      else {

        // check reminder if incase it was escaped
        if (days.days >= 16) {
          await userService.updateReminder({
            client_id: days.id,
            reminder: 8,
            checked: 1
          });
          start();
        }
        else if (days.days >= 8 && days.days <= 14) {
          await userService.updateReminder({
            client_id: days.id,
            reminder: 9,
            checked: 1
          });
          start();
        }
        else if (days.days >= 2 && days.days <= 6) {
          await userService.updateReminder({
            client_id: days.id,
            reminder: 10,
            checked: 1
          });
          start();
        }

        else if (days.days >= -6 && days.days <= 0) {
          await userService.updateReminder({
            client_id: days.id,
            reminder: 11,
            checked: 1
          });
          start();
        }
        else if (days.days >= -14 && days.days <= -8) {
          await userService.updateReminder({
            client_id: days.id,
            reminder: 12,
            checked: 1
          });
          start();
        }
        else if (days.days >= -20 && days.days <= -16) {
          await userService.updateReminder({
            client_id: days.id,
            reminder: 13,
            checked: 1
          });
          start();
        }

        else if (days.days >= -29 && days.days <= -22) {
          await userService.updateReminder({
            client_id: days.id,
            reminder: 14,
            checked: 1
          });
          start();
        }
        else {
          await userService.updateReminderChecked({
            client_id: days.id,
            // reminder: 8,
            checked: 1
          });
          // console.log("helloddd")
          start();
        }
      }
    } else {
      start();
    }
  }
  // console.log("gg")
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