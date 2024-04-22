import { SceneContext } from "telegraf/typings/scenes";

export const SceneLauncher = (ctx: SceneContext, ScenePayload: string) => {
    ctx.scene.enter(ScenePayload);
};
