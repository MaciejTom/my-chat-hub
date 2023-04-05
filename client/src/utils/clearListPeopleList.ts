import { ChatUser } from "../models/ChatUser";

export const clearPeopleList = (people: ChatUser[], id: string) => {
    let uniqPeople = people.filter(
      (element, index, self) =>
        index === self.findIndex((t) => t.userId === element.userId)
    );
    const peopleWithoutHost = uniqPeople.filter(
      (person) => person.userId !== id
    );
    return peopleWithoutHost;
  }