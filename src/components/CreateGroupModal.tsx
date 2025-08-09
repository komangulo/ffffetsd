import { useState } from "react"
import { X, MapPin, Lock, Users, Globe } from "lucide-react"
import { NexusButton } from "@/components/ui/nexus-button"

interface CreateGroupModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (groupData: GroupFormData) => void
}

interface GroupFormData {
  name: string
  description: string
  location: string
  restrictions: string
  privacy: "public" | "private"
}

const CreateGroupModal = ({ isOpen, onClose, onSubmit }: CreateGroupModalProps) => {
  const [formData, setFormData] = useState<GroupFormData>({
    name: "",
    description: "",
    location: "",
    restrictions: "",
    privacy: "public"
  })

  const [errors, setErrors] = useState<Partial<GroupFormData>>({})

  const handleInputChange = (field: keyof GroupFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<GroupFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = "El nombre del grupo es requerido"
    }

    if (!formData.description.trim()) {
      newErrors.description = "La descripción es requerida"
    }

    if (!formData.location.trim()) {
      newErrors.location = "La ubicación es requerida"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(formData)
      // Reset form
      setFormData({
        name: "",
        description: "",
        location: "",
        restrictions: "",
        privacy: "public"
      })
      setErrors({})
      onClose()
    }
  }

  const handleClose = () => {
    setFormData({
      name: "",
      description: "",
      location: "",
      restrictions: "",
      privacy: "public"
    })
    setErrors({})
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Crear Nuevo Grupo</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Nombre */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nombre del Grupo *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.name 
                  ? "border-red-500" 
                  : "border-gray-300 dark:border-gray-600"
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              placeholder="Ej: Principiantes BDSM Madrid"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Descripción *
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.description 
                  ? "border-red-500" 
                  : "border-gray-300 dark:border-gray-600"
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
              placeholder="Describe el propósito y objetivos del grupo..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ubicación *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.location 
                    ? "border-red-500" 
                    : "border-gray-300 dark:border-gray-600"
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                placeholder="Ej: Madrid, España"
              />
            </div>
            {errors.location && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.location}</p>
            )}
          </div>

          {/* Restricciones */}
          <div>
            <label htmlFor="restrictions" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Restricciones
            </label>
            <textarea
              id="restrictions"
              value={formData.restrictions}
              onChange={(e) => handleInputChange("restrictions", e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Dejar en blanco si está abierto a todos. Ej: Solo para personas mayores de 25 años, Solo para principiantes..."
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Deja en blanco si el grupo está abierto a todos
            </p>
          </div>

          {/* Privacidad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Privacidad
            </label>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="privacy"
                  value="public"
                  checked={formData.privacy === "public"}
                  onChange={(e) => handleInputChange("privacy", e.target.value)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                />
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-blue-500" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Público</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Cualquier persona puede ver y unirse al grupo
                    </div>
                  </div>
                </div>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="privacy"
                  value="private"
                  checked={formData.privacy === "private"}
                  onChange={(e) => handleInputChange("privacy", e.target.value)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                />
                <div className="flex items-center space-x-2">
                  <Lock className="h-4 w-4 text-yellow-500" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Privado</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Solo los miembros pueden ver el contenido completo
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <NexusButton
              type="button"
              variant="nexusOutline"
              onClick={handleClose}
            >
              Cancelar
            </NexusButton>
            <NexusButton
              type="submit"
              variant="nexus"
            >
              Crear Grupo
            </NexusButton>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateGroupModal



