import { TeamID } from "../..";
import { definePerson } from "../..";

export default definePerson({
    name: 'Arslan Siraj',
    role: 'PhD Student',
    avatar: '/images/persons/siraj-arslan.png',
    email: "arslan.siraj@uni-tuebingen.de",
    phone: '+49 7071 29 70437',
    address: 'Sand 14, 2.OG Raum C313, 72076 Tübingen',
    team: TeamID.ABI,
    socialLinks: [
        { icon: "github", link: "https://github.com/Arslan-Siraj" },
        { icon: "linkedin", link: "https://www.linkedin.com/in/arslan-siraj-507949155/" },
      ],
});
