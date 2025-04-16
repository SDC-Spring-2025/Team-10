import os
from process_txt import find_total_from_file

def test_ocr_totals_from_list(ground_truth):
    total_passed = 0
    total_failed = 0
    total_cases = len(ground_truth)

    for number in range(len(ground_truth)):
        if number < 10:
            filename = "100" + str(number) + "-receipt.jpg.txt"
        elif number < 100:
            filename = "10" + str(number) + "-receipt.jpg.txt"
        else:
            filename = "1" + str(number) + "-receipt.jpg.txt"
        file_path = os.path.join(os.path.join(os.path.join("backend", "data"), "txt"), filename)

        predicted_str = find_total_from_file(file_path)
        try:
            predicted = predicted_str
        except (TypeError, ValueError):
            print("Error at " + filename)
            predicted = None

        if predicted is not None and abs(predicted - ground_truth[number]) < 0.01:
            print(f"[✔] {filename}: expected {ground_truth[number]}, got {predicted}")
            total_passed += 1
        else:
            print(f"[✘] {filename}: expected {ground_truth[number]}, got {predicted}")
            total_failed += 1

    accuracy = total_passed / total_cases * 100 if total_cases else 0
    print(f"\n✅ Passed: {total_passed}")
    print(f"❌ Failed: {total_failed}")
    print(f"🎯 Accuracy: {accuracy:.2f}%")

correct = [
    56.58, 69.25, 7.61, 5.35, 15.03, 179.94, 93.58, 143.71, 24.47, 30.76, 77.83, 64.43, 33.26, 9.58, 48.53, 50.29, 35.52, 11.04, 2.17, 45.58, 47.02, 69.76, 37.37, 30.15, 33.92, 7.27, 51.82, 41.31, 34.21, 30.98, 94.78, 44.35, 9.50, 46.73, 17.00, 26.38, 52.76, 164.89, 17.80, 13.05, 28.04, 17.00, 55.39, 26.67, 10.94, 22.03, 38.86, 85.07, 91.45, 77.49,
    26.96, 10.70, 94.18, 52.47, 56.50, 30.58, 152.00, 9.58, 37.60, 7.55,
    83.50, 26.37, 142.01, 52.47, 19.44, 45.79, 82.00, 40.30, 42.90, 10.90,
    10.95, 75.50, 21.69, 13.22, 33.73, 14.36, 25.78, 69.79, 14.18, 235.19,
    92.22, 9.97, 6.56, 13.78, 125.99, 228.92, 157.51, 10.81, 13.03, 142.93,
    32.66, 28.78, 43.30, 38.23, 16.23, 10.25, 46.98, 13.12, 67.89, 64.52
]

test_ocr_totals_from_list(correct)