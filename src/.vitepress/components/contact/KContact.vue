<!--
  - Copyright (c) 2024.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->
<script lang="ts">
import { defineComponent } from "vue";
import KContactDetails from "../utilities/contact/KContactDetails.vue";
import {ContactDetails} from "../utilities/contact/types";
import KSwitch from "../utilities/switch/KSwitch.vue";
import {SwitchElement} from "../utilities/switch/types";

export default defineComponent({
    components: {KContactDetails, KSwitch},
    setup() {
        const items : SwitchElement[] = [
            {
                id: 'tbi',
                value: 'TBI'
            },
            {
                id: 'abi',
                value: 'ABI'
            }
        ];

        const tbiContact : ContactDetails = {
            address: [
                'University Hospital Tübingen',
                'Institute for Translational Bioinformatics',
                'Schaffhausenstraße 77',
                '72072 Tübingen'
            ],
            phone: '+49-7071-29-84335',
            email: 'tbi-sekr@medizin.uni-tuebingen.de'
        }

        const abiContact : ContactDetails = {
            address: [
                'University of Tübingen',
                'FBI/IBMI - Applied Bioinformatics',
                'Sand 14',
                '72076 Tübingen'
            ],
            phone: '+49-7071-29-70458',
            fax: '+49-7071-29-5152',
            email: 'claudia.walter@uni-tuebingen.de'
        }

        return {
            items,
            tbiContact,
            abiContact
        }
    }
})
</script>
<template>
    <div class="container">
        <div class="page-title">
            <h1 class="page-title-text"><i class="fas fa-address-book"></i> Contact</h1>
        </div>
        <div class="m-auto">
            <KSwitch :items="items" :current="'tbi'">
                <template #tbi>
                    <h5>Translational Bioinformatics Group</h5>
                    <KContactDetails :entity="tbiContact" />
                </template>
                <template #abi>
                    <h5>Applied Bioinformatics Group</h5>
                    <KContactDetails :entity="abiContact" />
                </template>
            </KSwitch>
        </div>
    </div>
</template>
