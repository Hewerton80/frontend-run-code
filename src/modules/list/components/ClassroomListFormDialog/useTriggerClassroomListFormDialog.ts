import { parseAsBoolean, parseAsInteger, useQueryState } from "nuqs";
import { useCallback } from "react";

export const useTriggerClassroomListFormDialog = () => {
  const SHOW_PARAM_NAME = "showClassroomListFormDialog";
  const LIST_ID_PARAM_NAME = "listIdToEdit";

  const [showClassroomListFormDialog, setShowClassroomListFormDialog] =
    useQueryState(SHOW_PARAM_NAME, parseAsBoolean.withDefault(false));

  const [listIdToEdit, setListIdToEdit] = useQueryState(
    LIST_ID_PARAM_NAME,
    parseAsInteger.withDefault(0),
  );

  const closeClassroomListFormDialog = useCallback(() => {
    setShowClassroomListFormDialog(null);
    setListIdToEdit(null);
  }, [setListIdToEdit, setShowClassroomListFormDialog]);

  const showClassroomListFormDialogWithListId = useCallback(
    (listId: number | null) => {
      setListIdToEdit(listId);
      setShowClassroomListFormDialog(true);
    },
    [setListIdToEdit, setShowClassroomListFormDialog],
  );

  return {
    listIdToEdit,
    showClassroomListFormDialog,
    closeClassroomListFormDialog,
    showClassroomListFormDialogWithListId,
  };
};
