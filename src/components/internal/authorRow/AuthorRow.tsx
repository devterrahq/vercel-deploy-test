import { useEffect, useState } from 'react';
import { getPersonData } from '@/helpers/api-client-helpers';
import { Image } from '@npm-refactored/storyblok-next-image';
import { isAssetDefined } from '@npm-refactored/storyblok-utilities';
import type { PersonStoryblok } from '@/component-types';
import './AuthorRow.scss';

interface AuthorRowProps {
  authors?: Array<string>;
}
export default function AuthorRow({ authors }: AuthorRowProps) {
  if (authors && authors.length > 0) {
    return (
      <ul className='author-row'>
        {authors.map((authorUuid) => (
          <li key={authorUuid}>
            <PersonImageWithSocials personUuid={authorUuid} />
          </li>
        ))}
      </ul>
    );
  }
}

interface PersonImageWithSocialsProps {
  personUuid: string | undefined;
}
export function PersonImageWithSocials({ personUuid }: PersonImageWithSocialsProps) {
  const [person, setPerson] = useState<PersonStoryblok | undefined>();

  useEffect(() => {
    if (!personUuid) return;
    getPersonData(personUuid)
      .then((data) => {
        setPerson(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [personUuid]);

  if (person) {
    return (
      <div className='person-image'>
        {isAssetDefined(person.image) ? <Image src={person.image} width={74} height={74} /> : null}
        {person.social_media && person.social_media.length > 0 ? (
          <ul>
            {person.social_media.map((_social) => (
              <li>Social</li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
}
