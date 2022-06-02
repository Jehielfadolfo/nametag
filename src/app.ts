/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';
type NameTagDescriptor = {
    displayName: string;
    resourceName: string;
    label_position: {
        x: number;
        y: number;
        z: number;
    };
    scale: {
        x: number;
        y: number;
        z: number;
    };
    rotation: {
        x: number;
        y: number;
        z: number;
    };
    position: {
        x: number;
        y: number;
        z: number;
    };
};


type NameTagDatabase = {
    [key: string]: NameTagDescriptor;
};
const NameTagDatabase: NameTagDatabase = require('../public/nametags.json');

export default class Attendance {
    private text: MRE.Actor = null;
    private prefabs: { [key: string]: MRE.Prefab } = {};
    private assets: MRE.AssetContainer;
    private menuTextHeight = 0.3;
    private menuTextVertSpace = .05;


    constructor(private context: MRE.Context) {
        this.context.onStarted(() => this.started());
    }

    /**
     * Once the context is "started", initialize the app.
     */
    private async started() {
        // Preload all the name tag models.

        await this.preloadNameTags();
        this.showAttendance();

    }
    private showAttendance() {
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
                        rotation: MRE.Quaternion.FromEulerAngles(
                            90 * MRE.DegreesToRadians,
                            180 * MRE.DegreesToRadians,
                            0 * MRE.DegreesToRadians),
                        scale: { x: 2.0, y: 2.0, z: 2.0 }
                    }
                }
            }
        });
    }
    private preloadNameTags() {
        // Loop over the name tag database, preloading each name tag resource.
        // Return a promise of all the in-progress load promises. This
        // allows the caller to wait until all name tag are done preloading
        // before continuing.
        return Promise.all(
            Object.keys(NameTagDatabase).map(nameTagId => {
                const nameTagRecord = NameTagDatabase[nameTagId];
                if (nameTagRecord.resourceName) {
                    return this.assets.loadGltf(
                        `${nameTagRecord.resourceName}`)
                        .then(assets => {
                            this.prefabs[nameTagId] = assets.find(a => a.prefab !== null) as MRE.Prefab;
                        })
                        .catch(e => MRE.log.error("app", e));
                } else {
                    return Promise.resolve();
                }
            }));

    }

}

