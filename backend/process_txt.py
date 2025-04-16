import re

def find_total_from_file(filepath):
    total_candidates = []
    subtotal = 0.0
    tax = 0.0

    try:
        with open(filepath, "r", encoding="utf-8") as file:
            lines = file.readlines()

        for line in lines:
            clean_line = line.strip().lower()

            if "subtotal" in clean_line or "sub total" in clean_line:
                amounts = re.findall(r"\$?\d+\s?[\.,]\s?\d{2}", clean_line)
                if amounts:
                    subtotal = float(amounts[-1].replace("$", "").replace(" ", "").replace(",", "."))
            
            if "tax" in clean_line:
                amounts = re.findall(r"\$?\d+\s?[\.,]\s?\d{2}", clean_line)
                if amounts:
                    tax = float(amounts[-1].replace("$", "").replace(" ", "").replace(",", "."))
            
            if "amt due" in clean_line:
                amounts = re.findall(r"\$?\d+\s?[\.,]\s?\d{2}", clean_line)
                if amounts:
                    total_candidates.append((line, amounts[-1].replace("$", "").replace(" ", "").replace(",", ".")))
                    break

            if ("total" in clean_line or "tota!" in clean_line or "tetal" in clean_line or "balance due" in clean_line) and ("subtotal" not in clean_line and "sub total" not in clean_line and "sub-total" not in clean_line and "tax" not in clean_line):
                # Match currency-like patterns (e.g. 25.94 or $25.94)
                amounts = re.findall(r"\$?\d+\s?[\.,]\s?\d{2}", clean_line)
                if amounts:
                    total_candidates.append((line, amounts[-1].replace("$", "").replace(" ", "").replace(",", ".")))

        # Return last total found (after subtotal most likely)
        if not total_candidates:
            if subtotal != 0:
                return subtotal
            else:
                return None
        elif float(total_candidates[-1][1]) < subtotal:
            if subtotal != 0 and tax != 0:
                return subtotal + tax
            else:
                return subtotal
        return float(total_candidates[-1][1])
        

    except FileNotFoundError:
        print(f"File not found: {filepath}")
    except Exception as e:
        print(f"Error reading file: {e}")