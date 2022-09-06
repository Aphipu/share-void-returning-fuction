import { Context, Service, ServiceBroker } from "moleculer";

export default class DecisionService extends Service {
  constructor(_broker: ServiceBroker) {
    super(_broker)
    this.parseServiceSchema({
      name: 'decision',
      version: 1,
      actions: {
        wrap: async (ctx: Context) => {
          try{
            return ctx.call("v1.decision.emitCall")
          }catch(e){
            return 'not-ok'
          }
        },
        directCall: async (ctx: Context) => {
          try {
            await this.dangerous()
            this.logger.info('task done')
            return 'ok'
          } catch (e) {
            return 'not-ok'
          }
        },
        emitCall: async (ctx: Context) => {
          const result = await ctx.emit('trigger')
          return result
        }
      },
      events: {
        trigger: async () => {
          await this.dangerous()
          this.logger.info('task done')
          return 'ok'
        },
      }
    })
  }

  public async dangerous() {
    // (simulate some asynchronous work happening)
    await new Promise((resolve) => setTimeout(resolve, 100));
   
    // (simulate some crashing bug in the code)
    if (Math.random() > 0.5) {
      throw new Error("Oh no!");
    }
  }
}
