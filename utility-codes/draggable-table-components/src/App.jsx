import Table from "./components/Table";
import { useState } from "react";
import initialData from "./initial-data";
import { DragDropContext } from "react-beautiful-dnd";

export default function App() {
  const [data, setData] = useState(initialData.people);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    // console.log(source, destination)

    // Check if there is no destination (dragged outside of droppable area)
    if (!destination) return;

    // Check if the item is dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    var newPersonIds = [];
    for (const id in data) {
      newPersonIds.push(id);
    }

    // const newPersonIds = Array.from(data.personIds);
    newPersonIds.splice(source.index, 1);
    newPersonIds.splice(destination.index, 0, draggableId);
    // console.log(newPersonIds);
    // const newData = {};
    const people = {};
    for (const id of newPersonIds) {
      // console.log(typeof(id))
      // console.log(data[id])
      people[id] = data[id];
    }
    // console.log(people);
    setData(people);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Table initialData={data} />
    </DragDropContext>
  );
}
