"use client";

import useSizeChartModal from "@/hooks/use-size-chart-modal";
import Modal from "@/components/ui/modal";

const SizeChartModal = () => {
  const sizeChartModal = useSizeChartModal();

  if (!sizeChartModal.isOpen) return null;

  return (
    <Modal open={sizeChartModal.isOpen} onClose={sizeChartModal.onClose}>
      <div className="w-full max-w-4xl bg-primary">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold text-secondary pb-2">Size Chart</h2>

          <div className="mb-8">
            <div className="overflow-x-auto bg-tertiary rounded-lg">
              <table className="w-full border-collapse border border-background rounded-lg overflow-hidden">
                <thead>
                  <tr className="text-secondary">
                    <th className="border border-background px-4 py-2 text-center">
                      Size
                    </th>
                    <th className="border border-background px-4 py-2 text-center">
                      Bust (inches)
                    </th>
                    <th className="border border-background px-4 py-2 text-center">
                      Waist (inches)
                    </th>
                    <th className="border border-background px-4 py-2 text-center">
                      Hips (inches)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-background">
                    <td className="border border-background px-4 py-2 font-medium text-center">
                      XXS
                    </td>
                    <td className="border border-background px-4 py-2 text-center">
                      28
                    </td>
                    <td className="border border-background px-4 py-2 text-center">
                      24-25
                    </td>
                    <td className="border border-background px-4 py-2 text-center">
                      32
                    </td>
                  </tr>
                  <tr className="text-background">
                    <td className="border border-background px-4 py-2 font-medium text-center">
                      XS
                    </td>
                    <td className="border border-background px-4 py-2 text-center">
                      30
                    </td>
                    <td className="border border-background px-4 py-2 text-center">
                      26-27
                    </td>
                    <td className="border border-background px-4 py-2 text-center">
                      34
                    </td>
                  </tr>
                  <tr className="text-background">
                    <td className="border border-background px-4 py-2 font-medium text-center">
                      S
                    </td>
                    <td className="border border-background px-4 py-2 text-center">
                      32
                    </td>
                    <td className="border border-background px-4 py-2 text-center">
                      28-29
                    </td>
                    <td className="border border-background px-4 py-2 text-center">
                      36
                    </td>
                  </tr>
                  <tr className="text-background">
                    <td className="border border-background px-4 py-2 font-medium text-center">
                      M
                    </td>
                    <td className="border border-background px-4 py-2 text-center">
                      34
                    </td>
                    <td className="border border-background px-4 py-2 text-center">
                      29-30
                    </td>
                    <td className="border border-background px-4 py-2 text-center">
                      38
                    </td>
                  </tr>
                  <tr className="text-background">
                    <td className="border border-background px-4 py-2 font-medium text-center">
                      L
                    </td>
                    <td className="border border-background px-4 py-2 text-center">
                      36
                    </td>
                    <td className="border border-background px-4 py-2 text-center">
                      31-32
                    </td>
                    <td className="border border-background px-4 py-2 text-center">
                      40
                    </td>
                  </tr>
                  <tr className="text-background">
                    <td className="border border-background px-4 py-2 font-medium text-center">
                      XL
                    </td>
                    <td className="border border-background px-4 py-2 text-center">
                      38
                    </td>
                    <td className="border border-background px-4 py-2 text-center">
                      33-34
                    </td>
                    <td className="border border-background px-4 py-2 text-center">
                      42
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Size Guide */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-secondary mb-4">
              How to Measure
            </h3>
            <div className="space-y-3 text-sm text-secondary">
              <div className="flex items-start">
                <span className="font-medium text-secondary w-16">Bust:</span>
                <span>
                  Measure around the fullest part of your chest, keeping the
                  tape measure horizontal.
                </span>
              </div>
              <div className="flex items-start">
                <span className="font-medium text-secondary w-16">Waist:</span>
                <span>
                  Measure around the narrowest part of your waist, typically
                  just above the hip bones.
                </span>
              </div>
              <div className="flex items-start">
                <span className="font-medium text-secondary w-16">Hips:</span>
                <span>
                  Measure around the fullest part of your hips, keeping the tape
                  measure horizontal.
                </span>
              </div>
            </div>
          </div>

          {/* Size Notes */}
          <div className="bg-background border border-foreground rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">Size Notes:</h4>
            <ul className="list-disc pl-5 text-sm text-foreground space-y-1">
              <li>All measurements are in inches</li>
              <li>Sizes may vary slightly between different styles</li>
              <li>If you&apos;re between sizes, we recommend sizing up</li>
              <li>
                For the best fit, please refer to individual product
                descriptions
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SizeChartModal;
