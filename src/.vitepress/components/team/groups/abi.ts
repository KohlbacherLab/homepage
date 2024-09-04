import { ElhabashyHadeer } from '../members/elhabashy-hadeer';
import { FerozAyesha } from '../members/feroz-ayesha';
import { KaipfCamill } from '../members/kaipf-camill';
import { KimJihyung } from '../members/kim-jihyung';
import { KohlbacherOliver } from '../members/kohlbacher-oliver';
import { JeongKyowon } from '../members/jeong-kyowon';
import { KuchenbeckerLeon } from '../members/kuchenbecker-leon';
import { NagelAndreas } from '../members/nagel-andreas';
import { PilzMatteo } from '../members/pilz-matteo';
import { RoehlAlexander } from '../members/roehl-alexander';
import { SachsenbergTimo } from '../members/sachsenberg-timo';
import { SirajArslan } from '../members/siraj-arslan';
import { SueruenBilge } from '../members/sueruen-bilge';
import { WalterAlex } from '../members/walter-alex';
import { WalterClaudia } from '../members/walter-claudia';
import { WeinSamuel } from '../members/wein-samuel';
import type { TeamMember } from '../types';

const ABI_TEAM_MEMBERS : TeamMember[] = [
    KohlbacherOliver,

    // Assistent
    WalterClaudia,

    // Researcher
    KaipfCamill,
    KuchenbeckerLeon,

    // SystemAdmin
    NagelAndreas,

    // PostDoc
    ElhabashyHadeer,
    JeongKyowon,
    SachsenbergTimo,
    WalterAlex,
    WeinSamuel,

    // PhD Student
    KimJihyung,
    PilzMatteo,
    RoehlAlexander,
    SirajArslan,
    SueruenBilge,
    FerozAyesha,
];

export {
    ABI_TEAM_MEMBERS,
};
