import { Company } from "../types/Company";

export class UIManager {
  private companies: Company[];
  private companyInfoElement: HTMLElement;

  constructor(companies: Company[]) {
    this.companies = companies;
    this.companyInfoElement = document.getElementById(
      "company-info"
    ) as HTMLElement;

    if (!this.companyInfoElement) {
      console.error("Company info element not found in the DOM");
    }
  }

  showCompanyInfo(companyId: string): void {
    const company = this.companies.find((c) => c.id === companyId);

    if (!company || !this.companyInfoElement) return;

    // Create company info HTML
    const html = `
      <h3>${company.name}</h3>
      <p><strong>Industry:</strong> ${company.industry}</p>
      <p><strong>Founded:</strong> ${company.foundedYear}</p>
      <p><strong>Employees:</strong> ${company.employees}</p>
      <p><strong>Address:</strong> ${company.address.street}, ${company.address.city}, ${company.address.state} ${company.address.zip}</p>
      <p>${company.description}</p>
    `;

    // Update the info panel
    this.companyInfoElement.innerHTML = html;
    this.companyInfoElement.style.display = "block";

    // Add a colored border matching the company logo
    this.companyInfoElement.style.borderLeft = `5px solid ${company.logoColor}`;
  }

  hideCompanyInfo(): void {
    if (this.companyInfoElement) {
      this.companyInfoElement.style.display = "none";
    }
  }
}
