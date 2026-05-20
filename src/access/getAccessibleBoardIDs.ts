export const getAccessibleBoardIDs = (
  user: any,
): (string | number)[] => {

  if (!user?.boards) {
    return []
  }

  return user.boards.map(
    (board: any) => {

      if (
        typeof board === 'object' &&
        board !== null
      ) {
        return board.id
      }

      return board
    },
  )
}