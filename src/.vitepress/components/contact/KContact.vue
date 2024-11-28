<!--
  - Copyright (c) 2024.
  - Author Peter Placzek (tada5hi)
  - For the full copyright and license information,
  - view the LICENSE file that was distributed with this source code.
  -->
<script lang="ts">
import { VPImage } from 'vitepress/theme';
import { defineComponent } from 'vue';
import KContactDetails from '../utilities/contact/KContactDetails.vue';
import type { ContactDetails } from '../utilities/contact/types';
import KSwitch from '../utilities/switch/KSwitch.vue';
import type { SwitchElement } from '../utilities/switch/types';

export default defineComponent({
    components: { KContactDetails, KSwitch, VPImage },
    setup() {
        const items : SwitchElement[] = [
            {
                id: 'tbi',
                value: 'TBI',
            },
            {
                id: 'abi',
                value: 'ABI',
            },
        ];

        const tbiContact : ContactDetails = {
            address: [
                'University Hospital Tübingen',
                'Institute for Translational Bioinformatics',
                'Schaffhausenstraße 77',
                '72072 Tübingen',
            ],
            phone: '+49-7071-29-84335',
            email: 'tbi-sekr@medizin.uni-tuebingen.de',
        };

        const abiContact : ContactDetails = {
            address: [
                'University of Tübingen',
                'FBI/IBMI - Applied Bioinformatics',
                'Sand 14',
                '72076 Tübingen',
            ],
            phone: '+49-7071-29-70458',
            fax: '+49-7071-29-5152',
            email: 'claudia.walter@uni-tuebingen.de',
        };

        return {
            items,
            tbiContact,
            abiContact,
        };
    },
});
</script>
<template>
    <div class="container">
        <div class="page-title">
            <h1 class="page-title-text">
                <i class="fas fa-address-book" /> Contact
            </h1>
        </div>
        <div class="m-auto">
            <KSwitch
                :items="items"
                :current="'tbi'"
            >
                <template #tbi>
                    <h3>Translational Bioinformatics Group</h3>
                    <div class="d-flex flex-column gap-3">
                        <div>
                            <KContactDetails :entity="tbiContact" />
                        </div>
                        <hr>

                        <h4>How To Find Us</h4>
                        <div class="row">
                            <div class="col-md-8 col-12">
                                <h6><i class="fa fa-car" /> By Car</h6>
                                <ul class="contact-list">
                                    <li>Drive on B27 direction Tübingen from Stuttgart</li>
                                    <li>Take the exit for Herrenberg, Rottenburg (A81)</li>
                                    <li>Follow the street until you see an exit for "Zentrum" on the right</li>
                                    <li>After crossing the bridge, take the next exit on the right</li>
                                    <li>Continue on the road until you see a large building on the left labeled "SYSS" (see image)</li>
                                </ul>

                                <h6><i class="fa fa-train" /> By Train</h6>
                                <ul class="contact-list">
                                    <li>Arrive at Tübingen train station</li>
                                    <li>The main bus station is directly across from the station exit</li>
                                    <li>Walk to the building (see image)</li>
                                </ul>

                                <h6><i class="fa fa-plane" /> By Airplane</h6>
                                <ul class="contact-list">
                                    <li>Arrive at Stuttgart airport</li>
                                    <li>Take bus lines 826 or 828 (called 'Airport-Sprinter') from in front of the arrivals exit</li>
                                    <li>Arrive at Tübingen main bus station</li>
                                    <li>Walk to the building (see image)</li>
                                </ul>
                            </div>
                            <div class="col-md-4 col-12">
                                <VPImage
                                    class="contact-image"
                                    image="/images/contact/tbi.jpg"
                                />
                            </div>
                        </div>
                    </div>
                </template>
                <template #abi>
                    <h3>Applied Bioinformatics Group</h3>

                    <div class="d-flex flex-column gap-3">
                        <div>
                            <KContactDetails :entity="abiContact" />
                        </div>
                        <hr>

                        <h4>How To Find Us</h4>
                        <div class="row">
                            <div class="col-md-8 col-12">
                                <p class="mb-1">
                                    The Applied Bioinformatics Group is located on the 2nd floor (3rd floor for Americans)
                                    of the orange building at Sand 14.
                                </p>

                                <h6><i class="fa fa-car" /> By Car</h6>
                                <ul class="contact-list">
                                    <li>Drive on B27 direction Tübingen from Stuttgart</li>
                                    <li>Take exit Tübingen, Nordstadt, Kliniken</li>
                                    <li>At the 3rd traffic light, turn left onto Wilhelmstraße</li>
                                    <li>Turn right after the JET gas station (going uphill, onto Nordring)</li>
                                    <li>At the 2nd traffic light, turn right (follow the "Sand" sign)</li>
                                    <li>Turn left into Drosselweg</li>
                                </ul>

                                <h6><i class="fa fa-bus" /> By Bus</h6>

                                <ul class="contact-list">
                                    <li>Take bus line 2 towards "Sand" from the main bus station</li>
                                    <li>Get off at the "Sand Drosselweg" stop</li>
                                    <li>Walk about 200m to where the bus turned around</li>
                                    <li>Enter the large orange building through the main gate and entrance (see image)</li>
                                </ul>

                                <h6><i class="fa fa-train" /> By Train</h6>
                                <ul class="contact-list">
                                    <li>Arrive at Tübingen train station</li>
                                    <li>The main bus station is directly across from the station exit</li>
                                    <li>Take bus line 2 (see above)</li>
                                </ul>

                                <h6><i class="fa fa-plane" /> By Airplane</h6>
                                <ul class="contact-list">
                                    <li>Arrive at Stuttgart airport</li>
                                    <li>Take bus lines 826 or 828 (called 'Airport-Sprinter') from in front of the arrivals exit</li>
                                    <li>Arrive at Tübingen main bus station</li>
                                    <li>Arrive at Tübingen main bus station and follow the bus directions above</li>
                                </ul>
                            </div>
                            <div class="col-md-4 col-12">
                                <VPImage
                                    class="contact-image"
                                    image="/images/contact/abi.jpg"
                                />
                            </div>
                        </div>
                    </div>
                </template>
            </KSwitch>
        </div>
    </div>
</template>
<style>
.contact-list {
    list-style: inherit;
}

.contact-image {
    width: 480px;
    height: 280px;
    object-fit: cover;
    object-position: bottom;
    border-radius: 6px;
}
</style>
