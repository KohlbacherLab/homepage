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

export default defineComponent({
    components: { KContactDetails, VPImage },
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

        return {
            contact,
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
            <h3>KohlbacherLab</h3>
            <div class="d-flex flex-column gap-3">
                <div>
                    <KContactDetails :entity="contact" />
                </div>
                <hr>

                <h4>How To Find Us</h4>
                <div class="row">
                    <div class="col-md-8 col-12">
                        <h6><i class="fa fa-car" /> By Car</h6>
                        <ul class="contact-list">
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
                        <ul class="contact-list">
                            <li>From Tübingen Hauptbahnhof, cross the street to the "Europaplatz" bus stops</li>
                            <li>Take Bus Line 3 toward "Waldhäuser Ost" (approx. 15 minutes)</li>
                            <li>Exit at "Sternwarte"</li>
                            <li>Follow Paul-Ehrlich-Straße and turn left onto Maria-von-Linden-Straße</li>
                            <li>The building is at number 6 on the right side</li>
                        </ul>

                        <h6><i class="fa fa-train" /> By Train</h6>
                        <ul class="contact-list">
                            <li>Arrive at Tübingen Hauptbahnhof</li>
                            <li>The main bus station is directly across from the station exit</li>
                            <li>Take Bus Line 3 (see above)</li>
                        </ul>

                        <h6><i class="fa fa-plane" /> By Airplane</h6>
                        <ul class="contact-list">
                            <li>Arrive at Stuttgart Airport</li>
                            <li>Take Airport-Sprinter Bus Line 828 to Tübingen Hauptbahnhof (approx. 60 minutes)</li>
                            <li>Then follow the bus directions above</li>
                        </ul>
                    </div>
                    <div class="col-md-4 col-12">
                        <VPImage
                            class="contact-image"
                            image="/images/contact/mvl6.jpg"
                        />
                    </div>
                </div>
            </div>
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
