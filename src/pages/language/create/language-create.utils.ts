export const languageSelectorList = () =>
  [
    {
      name: 'Russian',
      logo: 'https://flagicons.lipis.dev/flags/4x3/ru.svg'
    },
    {
      name: 'German',
      logo: 'https://flagicons.lipis.dev/flags/4x3/de.svg'
    },
    {
      name: 'Polish',
      logo: 'https://flagicons.lipis.dev/flags/4x3/pl.svg'
    },
    {
      name: 'Brazilian',
      logo: 'https://flagicons.lipis.dev/flags/4x3/br.svg'
    },
    {
      name: 'Portuguese',
      logo: 'https://flagicons.lipis.dev/flags/4x3/pt.svg'
    },
    {
      name: 'English',
      logo: 'https://flagicons.lipis.dev/flags/4x3/gb.svg'
    }
  ].map((language) => ({
    ...language,
    value: language.name,
    label: language.name
  }));
