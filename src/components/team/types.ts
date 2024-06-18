type SocialLinkIcon =
    | 'discord'
    | 'facebook'
    | 'github'
    | 'instagram'
    | 'linkedin'
    | 'mastodon'
    | 'npm'
    | 'slack'
    | 'twitter'
    | 'x'
    | 'youtube'
    | { svg: string };

interface SocialLink {
    icon: SocialLinkIcon
    link: string
    ariaLabel?: string
}

export interface TeamMember {
    // Avatar image for the member.
    avatar: string

    // Name of the member.
    name: string

    // Title to be shown below member's name.
    // e.g. Developer, Software Engineer, etc.
    title?: string

    // Organization that the member belongs.
    org?: string

    // URL for the organization.
    orgLink?: string

    // Description for the member.
    desc?: string

    // Social links. e.g. GitHub, Twitter, etc. You may pass in
    // the Social Links object here.
    // See: https://vitepress.dev/reference/default-theme-config.html#sociallinks
    links?: SocialLink[]

    // URL for the sponsor page for the member.
    sponsor?: string

    // Text for the sponsor link. Defaults to 'Sponsor'.
    actionText?: string
}
