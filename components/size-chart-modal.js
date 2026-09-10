"use client";

import { useState } from "react";
import useSizeChartModal from "@/hooks/use-size-chart-modal";
import Modal from "@/components/ui/modal";

const kanakMadhuriSizes = [
  { size: "XS", bust: 38.0, frontLength: 27.0, acrossShoulder: 15.0 },
  { size: "S", bust: 40.0, frontLength: 27.0, acrossShoulder: 15.0 },
  { size: "M", bust: 42.0, frontLength: 27.0, acrossShoulder: 16.0 },
  { size: "L", bust: 44.0, frontLength: 28.0, acrossShoulder: 17.0 },
  { size: "XL", bust: 46.0, frontLength: 28.0, acrossShoulder: 18.0 },
];

const SizeChartModal = () => {
  const [unit, setUnit] = useState("in");
  const sizeChartModal = useSizeChartModal();
  const { productType } = sizeChartModal;

  const showKanakMadhuriChart = productType === "kanak-madhuri";
  // Determine which charts to show based on product type
  const showFemaleChart = productType === "female" || productType === "combo";
  const showMaleChart = productType === "male" || productType === "combo";

  if (!sizeChartModal.isOpen) return null;

  const formatValue = (inchValue) => {
    if (unit === "cm") {
      return (inchValue * 2.54).toFixed(1);
    }
    return inchValue.toFixed(1);
  };

  return (
    <Modal open={sizeChartModal.isOpen} onClose={sizeChartModal.onClose}>
      <div className="w-full max-w-4xl bg-primary mx-4 sm:mx-auto">
        <div className="px-4 sm:px-6 py-4">
          {showKanakMadhuriChart && (
            <>
              <div className="flex items-center justify-between pb-2">
                <h2 className="text-xl sm:text-2xl font-bold text-secondary">
                  Size Chart
                </h2>
                <div className="flex items-center gap-1 border border-foreground/30 rounded-md p-0.5">
                  <button
                    type="button"
                    onClick={() => setUnit("in")}
                    className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                      unit === "in"
                        ? "bg-foreground text-background shadow-xs"
                        : "text-secondary hover:text-foreground"
                    }`}
                  >
                    in
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnit("cm")}
                    className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                      unit === "cm"
                        ? "bg-foreground text-background shadow-xs"
                        : "text-secondary hover:text-foreground"
                    }`}
                  >
                    cm
                  </button>
                </div>
              </div>

              <div className="mb-6 sm:mb-8">
                <div className="bg-tertiary rounded-lg shadow-sm">
                  <table className="w-full border-collapse border border-background rounded-lg overflow-hidden">
                    <thead>
                      <tr className="text-secondary">
                        <th className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                          Size
                        </th>
                        <th className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                          Bust
                        </th>
                        <th className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                          Front Length
                        </th>
                        <th className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                          Across Shoulder
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {kanakMadhuriSizes.map((row) => (
                        <tr key={row.size} className="text-background">
                          <td className="border border-background px-1 sm:px-2 py-2 font-medium text-center text-xs sm:text-sm">
                            {row.size}
                          </td>
                          <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                            {formatValue(row.bust)}
                          </td>
                          <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                            {formatValue(row.frontLength)}
                          </td>
                          <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                            {formatValue(row.acrossShoulder)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-secondary text-center mt-2 opacity-75">
                  All measurements are in {unit === "in" ? "inches" : "centimeters (cm)"}
                </p>
              </div>
            </>
          )}

          {showFemaleChart && (
            <>
          <h2 className="text-xl sm:text-2xl font-bold text-secondary pb-2">
            Size Chart - Female
          </h2>

          <div className="mb-6 sm:mb-8">
            <div className="bg-tertiary rounded-lg shadow-sm">
              <table className="w-full border-collapse border border-background rounded-lg overflow-hidden">
                <thead>
                  <tr className="text-secondary">
                    <th className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      Size
                    </th>
                    <th className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      Bust
                    </th>
                    <th className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      Waist
                    </th>
                    <th className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      Hips
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-background">
                    <td className="border border-background px-1 sm:px-2 py-2 font-medium text-center text-xs sm:text-sm">
                      XXS
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      28
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      24-25
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      32
                    </td>
                  </tr>
                  <tr className="text-background">
                    <td className="border border-background px-1 sm:px-2 py-2 font-medium text-center text-xs sm:text-sm">
                      XS
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      30
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      26-27
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      34
                    </td>
                  </tr>
                  <tr className="text-background">
                    <td className="border border-background px-1 sm:px-2 py-2 font-medium text-center text-xs sm:text-sm">
                      S
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      32
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      28-29
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      36
                    </td>
                  </tr>
                  <tr className="text-background">
                    <td className="border border-background px-1 sm:px-2 py-2 font-medium text-center text-xs sm:text-sm">
                      M
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      34
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      29-30
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      38
                    </td>
                  </tr>
                  <tr className="text-background">
                    <td className="border border-background px-1 sm:px-2 py-2 font-medium text-center text-xs sm:text-sm">
                      L
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      36
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      31-32
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      40
                    </td>
                  </tr>
                  <tr className="text-background">
                    <td className="border border-background px-1 sm:px-2 py-2 font-medium text-center text-xs sm:text-sm">
                      XL
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      38
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      33-34
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      42
                    </td>
                  </tr>
                  <tr className="text-background">
                    <td className="border border-background px-1 sm:px-2 py-2 font-medium text-center text-xs sm:text-sm">
                      XXL
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      40
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      35-36
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      44
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-secondary text-center mt-2 opacity-75">
              All measurements are in inches
            </p>
          </div>
            </>
          )}

          {showMaleChart && (
            <>
          <h2 className="text-xl sm:text-2xl font-bold text-secondary pb-2">
            Size Chart - Male
          </h2>

          <div className="mb-6 sm:mb-8">
            <div className="bg-tertiary rounded-lg shadow-sm">
              <table className="w-full border-collapse border border-background rounded-lg overflow-hidden">
                <thead>
                  <tr className="text-secondary">
                    <th className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      Size
                    </th>
                    <th className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      Chest
                    </th>
                    <th className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      Length
                    </th>
                    <th className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      Sleeve
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-background">
                    <td className="border border-background px-1 sm:px-2 py-2 font-medium text-center text-xs sm:text-sm">
                      XXXS
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      38
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      28
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      8
                    </td>
                  </tr>
                  <tr className="text-background">
                    <td className="border border-background px-1 sm:px-2 py-2 font-medium text-center text-xs sm:text-sm">
                      XXS
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      40
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      28
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      8
                    </td>
                  </tr>
                  <tr className="text-background">
                    <td className="border border-background px-1 sm:px-2 py-2 font-medium text-center text-xs sm:text-sm">
                      XS
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      42
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      28
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      8
                    </td>
                  </tr>
                  <tr className="text-background">
                    <td className="border border-background px-1 sm:px-2 py-2 font-medium text-center text-xs sm:text-sm">
                      S
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      44
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      28
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      8
                    </td>
                  </tr>
                  <tr className="text-background">
                    <td className="border border-background px-1 sm:px-2 py-2 font-medium text-center text-xs sm:text-sm">
                      M
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      46
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      28
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      8
                    </td>
                  </tr>
                  <tr className="text-background">
                    <td className="border border-background px-1 sm:px-2 py-2 font-medium text-center text-xs sm:text-sm">
                      L
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      48
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      28
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      8
                    </td>
                  </tr>
                  <tr className="text-background">
                    <td className="border border-background px-1 sm:px-2 py-2 font-medium text-center text-xs sm:text-sm">
                      XL
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      50
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      28
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      9
                    </td>
                  </tr>
                  <tr className="text-background">
                    <td className="border border-background px-1 sm:px-2 py-2 font-medium text-center text-xs sm:text-sm">
                      XXL
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      52
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      28
                    </td>
                    <td className="border border-background px-1 sm:px-2 py-2 text-center text-xs sm:text-sm">
                      10
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-secondary text-center mt-2 opacity-75">
              All measurements are in inches
            </p>
          </div>
            </>
          )}

          {/* Size Guide */}
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-secondary mb-3 sm:mb-4">
              How to Measure
            </h3>
            {showKanakMadhuriChart ? (
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-secondary">
                <div className="flex flex-col sm:flex-row sm:items-start">
                  <span className="font-medium text-secondary w-full sm:w-36 mb-1 sm:mb-0">
                    Bust:
                  </span>
                  <span className="text-secondary">
                    Measure around the fullest part of your bust while keeping the measuring tape comfortably level.
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start">
                  <span className="font-medium text-secondary w-full sm:w-36 mb-1 sm:mb-0">
                    Front Length:
                  </span>
                  <span className="text-secondary">
                    Measure from the highest point of the shoulder down to the bottom hem on the front.
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start">
                  <span className="font-medium text-secondary w-full sm:w-36 mb-1 sm:mb-0">
                    Across Shoulder:
                  </span>
                  <span className="text-secondary">
                    Measure straight across from one shoulder point to the other.
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-secondary">
                <div className="flex flex-col sm:flex-row sm:items-start">
                  <span className="font-medium text-secondary w-full sm:w-16 mb-1 sm:mb-0">
                    Bust:
                  </span>
                  <span className="text-secondary">
                    Measure around the fullest part of your chest, keeping the
                    tape measure horizontal.
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start">
                  <span className="font-medium text-secondary w-full sm:w-16 mb-1 sm:mb-0">
                    Waist:
                  </span>
                  <span className="text-secondary">
                    Measure around the narrowest part of your waist, typically
                    just above the hip bones.
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start">
                  <span className="font-medium text-secondary w-full sm:w-16 mb-1 sm:mb-0">
                    Hips:
                  </span>
                  <span className="text-secondary">
                    Measure around the fullest part of your hips, keeping the tape
                    measure horizontal.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Size Notes */}
          <div className="bg-background border border-foreground rounded-lg p-3 sm:p-4">
            <h4 className="font-medium text-foreground mb-2 text-sm sm:text-base">
              Size Notes:
            </h4>
            <ul className="list-disc pl-4 sm:pl-5 text-xs sm:text-sm text-foreground space-y-1">
              <li>
                All measurements are in{" "}
                {showKanakMadhuriChart && unit === "cm"
                  ? "centimeters (cm)"
                  : "inches"}
              </li>
              <li>Sizes may vary slightly between different styles</li>
              <li>If you&apos;re between sizes, we recommend sizing up</li>
              <li className="hidden sm:block">
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
