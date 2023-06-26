package Estrutura.Dados.Backoffice.Email;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import javax.mail.MessagingException;

@CrossOrigin(origins = "*")
@RestController
public class EmailController {

    @PostMapping("/enviar-email")
    public String enviarEmail(@RequestBody EmailRequest emailRequest) {
        try {
            EmailSender emailSender = new EmailSender();
            emailSender.sendEmail(emailRequest.getTo(), emailRequest.getSubject(), emailRequest.getBody());
            return "E-mail enviado com sucesso!";
        } catch (MessagingException e) {
            return "Erro ao enviar o e-mail: " + e.getMessage();
        }
    }
}
