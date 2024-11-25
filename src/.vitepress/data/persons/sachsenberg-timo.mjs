import { TeamID } from "../..";
import { definePerson } from "../..";

export default definePerson({
    address: [
        "Room C322",
        "Sand 14, Tübingen, Germany 72076"
    ],
    email: "timo.sachsenberg@uni-tuebingen.de",
    phone: "+49-7071-29-70461",
    avatar: '/images/persons/sachsenberg-timo.png',
    name: 'Timo Sachsenberg',
    team: TeamID.ABI,
    role: 'Staff Scientist',
    socialLinks: [
        { icon: 'github', link: 'https://github.com/timosachsenberg' },
        { icon: 'publications', link: 'https://scholar.google.com/citations?user=7H4EQacAAAAJ&hl=en' },
    ],
});
