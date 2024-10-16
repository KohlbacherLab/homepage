import { TeamID } from "../..";
import { definePerson } from "../..";

export default definePerson({
    avatar: 'https://www.github.com/SirHerr.png',
    name: 'Marius de Arruda Botelho Herr',
    title: 'PhD Student',
    team: TeamID.TBI,
    links: [
        { icon: 'github', link: 'https://github.com/SirHerr' },
        { icon: 'linkedin', link: 'https://de.linkedin.com/in/marius-de-arruda-botelho-herr-60b89b18b' },
    ],
});
