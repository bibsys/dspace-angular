import { SectionsType } from '../sections-type';

const sectionContainersMap = new Map();
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
