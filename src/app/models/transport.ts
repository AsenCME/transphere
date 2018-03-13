export class Transport {
  id: String;
  monthId: String;
  date: {
    day: String;
    weekDay: String;
    month: number;
    year: number;
  };
  event: {
    startDest: String;
    endDest: String;
    price: String;
    time: String;
  };
}