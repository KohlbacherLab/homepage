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
import type { ContactDetails } from '../utilities/contact/types.ts';
import KPageTitle from '../utilities/page-title/KPageTitle.vue';

export default defineComponent({
    components: {
        KContactDetails,
        KPageTitle,
        VPImage,
    },
    setup() {
        const contact : ContactDetails = {
            address: [
                'University of Tübingen',
                'Tübingen AI Research Building',
                'Maria-von-Linden-Straße 6',
                '72076 Tübingen',
            ],
            phone: '+49 7071 29 70457',
            email: 'oliver.kohlbacher@uni-tuebingen.de',
        };

        return { contact };
    },
});
</script>
<template>
    <div class="vp-raw mx-auto w-full max-w-[1320px] px-3">
        <KPageTitle icon="fas fa-address-book">
            Contact
        </KPageTitle>
        <div class="m-auto">
            <h3>KohlbacherLab</h3>
            <div class="flex flex-col gap-4">
                <div>
                    <KContactDetails :entity="contact" />
                </div>
                <hr class="my-4 border-border">

                <h4>How To Find Us</h4>
                <div class="grid grid-cols-12 gap-x-6">
                    <div class="col-span-12 md:col-span-8">
                        <h6><i class="fa fa-car" /> By Car</h6>
                        <ul class="mb-4 list-disc ps-8">
                            <li>Follow the B27 toward Tübingen from Stuttgart</li>
                            <li>Take the "Tübingen, Nordstadt, Kliniken" exit</li>
                            <li>At the 3rd traffic light, turn left onto Wilhelmstraße</li>
                            <li>Turn right onto "Nordring" (uphill)</li>
                            <li>At the 4th traffic light, turn left onto Waldhäuser Straße / Obere Viehweide</li>
                            <li>Turn left at the first opportunity into Friedrich-Miescher-Straße</li>
                            <li>Turn right into Maria-von-Linden-Straße — the building is approx. 30m ahead on the right</li>
                            <li>Parking is available behind the building via a ramp on the left</li>
                        </ul>

                        <h6><i class="fa fa-bus" /> By Bus</h6>
                        <ul class="mb-4 list-disc ps-8">
                            <li>From Tübingen Hauptbahnhof, cross the street to the "Europaplatz" bus stops</li>
                            <li>Take Bus Line 3 toward "Waldhäuser Ost" (approx. 15 minutes)</li>
                            <li>Exit at "Sternwarte"</li>
                            <li>Follow Paul-Ehrlich-Straße and turn left onto Maria-von-Linden-Straße</li>
                            <li>The building is at number 6 on the right side</li>
                        </ul>

                        <h6><i class="fa fa-train" /> By Train</h6>
                        <ul class="mb-4 list-disc ps-8">
                            <li>Arrive at Tübingen Hauptbahnhof</li>
                            <li>The main bus station is directly across from the station exit</li>
                            <li>Take Bus Line 3 (see above)</li>
                        </ul>

                        <h6><i class="fa fa-plane" /> By Airplane</h6>
                        <ul class="mb-4 list-disc ps-8">
                            <li>Arrive at Stuttgart Airport</li>
                            <li>Take Airport-Sprinter Bus Line 828 to Tübingen Hauptbahnhof (approx. 60 minutes)</li>
                            <li>Then follow the bus directions above</li>
                        </ul>
                    </div>
                    <div class="col-span-12 md:col-span-4">
                        <VPImage
                            class="h-[280px] w-[480px] rounded-md object-cover object-bottom"
                            image="/images/contact/mvl6.jpg"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
