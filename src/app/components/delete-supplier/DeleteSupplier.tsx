import { Modal, Button } from "antd";

interface DeleteSupplierProps {
  visible: boolean;
  handleCancel: () => void;
  handleDelete: () => void;
}

const DeleteSupplier = ({
  visible,
  handleCancel,
  handleDelete,
}: DeleteSupplierProps) => {
  return (
    <Modal
      title="Confirmar exclusão"
      visible={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancelar
        </Button>,
        <Button key="delete" type="primary" onClick={handleDelete}>
          Excluir
        </Button>,
      ]}
    >
      <p>Deseja realmente excluir este fornecedor?</p>
    </Modal>
  );
};

export default DeleteSupplier;
