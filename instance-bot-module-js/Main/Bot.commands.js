export const SceneLauncer = (ctx,ScenePayload) => {
    console.log(ctx, ScenePayload)
    ctx.scene.enter(ScenePayload);
}