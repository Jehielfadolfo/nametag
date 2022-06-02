"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const MRE = __importStar(require("@microsoft/mixed-reality-extension-sdk"));
const NameTagDatabase = require('../public/nametags.json');
class Attendance {
    constructor(context) {
        this.context = context;
        this.text = null;
        this.prefabs = {};
        this.menuTextHeight = 0.3;
        this.menuTextVertSpace = .05;
        this.context.onStarted(() => this.started());
    }
    /**
     * Once the context is "started", initialize the app.
     */
    async started() {
        // Preload all the name tag models.
        await this.preloadNameTags();
        this.showAttendance();
    }
    showAttendance() {
        const menu = MRE.Actor.Create(this.context, {});
        let y = -0.30;
        let x = -1.25;
        const vSpace = this.menuTextHeight + this.menuTextVertSpace;
        MRE.Actor.Create(this.context, {
            actor: {
                parentId: menu.id,
                name: 'label',
                text: {
                    contents: "Use selfie cam as a mirror",
                    height: 0.25,
                    anchor: MRE.TextAnchorLocation.MiddleCenter,
                    justify: MRE.TextJustify.Center,
                    color: MRE.Color3.White()
                },
                transform: {
                    local: { position: { x: 1.0, y: 1, z: 0 } }
                }
            }
        });
        y = y + vSpace;
        MRE.Actor.CreateFromPrefab(this.context, {
            prefabId: this.prefabs["menu-bkg"].id,
            actor: {
                transform: {
                    local: {
                        position: { x: 0.7, y: 1.5, z: 0.01 },
                        rotation: MRE.Quaternion.FromEulerAngles(90 * MRE.DegreesToRadians, 180 * MRE.DegreesToRadians, 0 * MRE.DegreesToRadians),
                        scale: { x: 2.0, y: 2.0, z: 2.0 }
                    }
                }
            }
        });
    }
    preloadNameTags() {
        // Loop over the name tag database, preloading each name tag resource.
        // Return a promise of all the in-progress load promises. This
        // allows the caller to wait until all name tag are done preloading
        // before continuing.
        return Promise.all(Object.keys(NameTagDatabase).map(nameTagId => {
            const nameTagRecord = NameTagDatabase[nameTagId];
            if (nameTagRecord.resourceName) {
                return this.assets.loadGltf(`${nameTagRecord.resourceName}`)
                    .then(assets => {
                    this.prefabs[nameTagId] = assets.find(a => a.prefab !== null);
                })
                    .catch(e => MRE.log.error("app", e));
            }
            else {
                return Promise.resolve();
            }
        }));
    }
}
exports.default = Attendance;
//# sourceMappingURL=app.js.map