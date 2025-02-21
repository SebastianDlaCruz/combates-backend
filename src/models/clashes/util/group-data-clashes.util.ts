export const groupDataClashes = (data: any[]) => {
  return data.reduce((acc, item) => {
    if (!acc[item.idClashes]) {
      acc[item.idClashes] = {
        idClashes: item.idClashes,
        boxers: []
      }
    }

    acc[item.idClashes].boxers.push({
      id: item.id,
      name: item.name,
      id_school: item.id_school,
      disability: item.disability,
      id_category: item.id_category,
      weight: item.weight,
      id_coach: item.id_coach,
      details: item.details,
      id_state: item.id_state
    })

    return acc;
  }, {})

}