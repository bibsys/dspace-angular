import { SectionsType } from '../sections-type';
import { ChangeRequestSectionContainerComponent } from './change-request/change-request-section-container.component';
import { DefaultSectionContainerComponent } from './default/default-section-container.component';

const sectionContainersMap = new Map();

sectionContainersMap.set(SectionsType.Any, DefaultSectionContainerComponent);
sectionContainersMap.set(SectionsType.ChangeRequest, ChangeRequestSectionContainerComponent);

/**
 * @deprecated
 */
export function renderSectionContainerFor(sectionType: SectionsType) {
  return function decorator(objectElement: any) {
    if (!objectElement) {
      return;
    }
    sectionContainersMap.set(sectionType, objectElement);
  };
}

export function rendersSectionContainerType(sectionType: SectionsType) {
  return (sectionContainersMap.has(sectionType))
    ? sectionContainersMap.get(sectionType)
    : sectionContainersMap.get(SectionsType.Any);
}
