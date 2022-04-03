module.exports = () => {
  return async function locale(ctx, next) {
    ctx.locals.locale = ctx.query.locale;
    ctx.locals.origin = ctx.request.origin;
    await next();
  };
};